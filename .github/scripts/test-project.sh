#!/bin/bash

set -eu
shopt -s inherit_errexit || true

export CI=true

dir=$1

# These are in optional-test.yaml, under the `platforms` directory
# But the names don't match the directory name
# Example `platforms-codesandbox` is in `platforms` directory
# So this renames the key so it's correctly processed
if [[ "$dir" = "platforms-codesandbox" ]]
then
  dir="platforms"
fi

project=$2
# allow matrix being undefined
set +u
matrix=$3
set -u

# In platforms/firebase-functions, the file exists in /functions sub-directory, so we can't hardcode the package.json path
pjson_path=$(find "$dir"/"$project" -name "package.json" ! -path "*/node_modules/*" | head -n 1)
bash .github/scripts/print-version.sh "$pjson_path"

# Install deps for Slack scripts
echo "cd .github/slack/"
cd .github/slack/
pnpm install
echo "cd ../.."
cd ../..

# Store root so we can go back to it later
root=$(pwd)

echo ""
echo ""
echo "-----------------------------"
echo "running $dir/$project"


# Find schema, if it contains `env("DATABASE_URL")`, db push that schema to database
if [[ "$project" = "foobar" ]]
then
  true
  # if a project needs to be skipped for any reason, replace `foobar` with its folder name or add additional conditions
else
  # Find version of Prisma this project uses (so we can call the CLI explicitly)
  default_version="$(cat .github/prisma-version.txt)"
  cli_version_dev="$(node -e "console.log(require('./$dir/$project/package.json')?.devDependencies?.prisma ?? '')")"
  cli_version_dep="$(node -e "console.log(require('./$dir/$project/package.json')?.dependencies?.prisma ?? '')")"
  version="$(node -e "console.log('$cli_version_dev' || '$cli_version_dep' || '$default_version')")"

  schema_path=$(find "$dir"/"$project" -name "schema.prisma" ! -path "*/node_modules/*" | head -n 1)
  if grep -q "= env(\"DATABASE_URL\")$" "$schema_path"; then
    echo ""
    echo "found 'schema.prisma' with 'env(\"DATABASE_URL\")': $schema_path"
    echo "$ pnpm dlx prisma@$version db push --accept-data-loss --skip-generate --schema=$schema_path"
    INVALID_ENV_VAR=$DATABASE_URL pnpm dlx prisma@"$version" db push --accept-data-loss --skip-generate --schema="$schema_path"
    # INVALID_ENV_VAR is used by driver-adapters to ensure that the env var is not used, we set it here to make the command work
    echo ""
  fi
fi

echo "$ cd $dir/$project"
cd "$dir/$project"

# if FORCE_PRISMA_CLIENT_CUSTOM_OUTPUT is set, we execute commands that will turn the project into a custom output project
if [ -n "${FORCE_PRISMA_CLIENT_CUSTOM_OUTPUT+x}" ]; then
  echo "-----------------------------"
  echo ""
  echo "FORCE_PRISMA_CLIENT_CUSTOM_OUTPUT=$FORCE_PRISMA_CLIENT_CUSTOM_OUTPUT, executing commands to turn the project into a custom output project"

  # whether the project has a src folder or not, we need to modify the path to the prisma client and how deep the path is
  find . -mindepth 3 -type f -name "*.js" ! -path "*/node_modules/*" ! -name "*test*" -print0 | xargs -0 -r sed -i "s/@prisma\/client/\.\.\/\.\.\/prisma\/client/g"
  find . -mindepth 3 -type f -name "*.mjs" ! -path "*/node_modules/*" ! -name "*test*" -print0 | xargs -0 -r sed -i "s/@prisma\/client/\.\.\/\.\.\/prisma\/client/g"
  find . -mindepth 2 -type f -name "*.js" ! -path "*/node_modules/*" ! -name "*test*" -print0 | xargs -0 -r sed -i "s/@prisma\/client/\.\.\/prisma\/client/g"
  find . -mindepth 2 -type f -name "*.mjs" ! -path "*/node_modules/*" ! -name "*test*" -print0 | xargs -0 -r sed -i "s/@prisma\/client/\.\.\/prisma\/client/g"
  find . -mindepth 1 -type f -name "*.js" ! -path "*/node_modules/*" ! -name "*test*" -print0 | xargs -0 -r sed -i "s/@prisma\/client/\.\/prisma\/client/g"
  find . -mindepth 1 -type f -name "*.mjs" ! -path "*/node_modules/*" ! -name "*test*" -print0 | xargs -0 -r sed -i "s/@prisma\/client/\.\/prisma\/client/g"

  find . -type f -name '*.prisma' ! -path '*/node_modules/*' -print0 | xargs -0 -r sed -i 's/provider\s*=\s*"prisma-client-js"/&\noutput = "client"/g'

  # this adds some level of safety to ensure that js files were at least modified as one would expect
  if [[ $(git status --porcelain | grep "$dir/$project" | grep -Ec ".m?js$") -gt 0 ]];
  then
    echo "javascript files were correctly modified for the custom output project"
  else
    echo "javascript files were not correctly modified for the custom output project"
    exit 1
  fi
fi

if [ -f "prepare.sh" ]; then
  echo "-----------------------------"
  echo ""
  echo "prepare script found, executing $dir/$project/prepare.sh"
  echo ""

  # execute & allow export of env vars
  . prepare.sh

  echo ""
  echo "finished prepare.sh"
  echo ""
  echo "-----------------------------"
fi

echo ""
echo ""
echo "-----------------------------"
echo "executing $dir/$project/run.sh"
# allow run.sh to fail without stopping this script
set +e
bash run.sh
code=$?
set -e

# if we're running docker-unsupported/*, we expect run.sh to fail
if [[ $dir == "docker-unsupported" ]]; then

  if [ $code -ne 0 ]; then
    echo "-----------------------------"
    echo ""
    echo "run.sh failed as expected (code $code), stopping docker..."
    echo ""
    set +e
    docker stop $(docker ps -a -q)
    set -e
    code=0
  else
    echo "-----------------------------"
    echo ""
    echo "run.sh was successful (code $code), but we expected it to fail!"
    echo ""
    set +e
    docker stop $(docker ps -a -q)
    set -e
    code=1
  fi

# otherwise, we expect run.sh to succeed
elif [ $code -eq 0 ]; then
  echo "-----------------------------"
  echo ""
  echo "run.sh was successful (code $code), running $dir/$project/test.sh..."
  echo ""

  if [ ! -f "test.sh" ]; then
    echo "$dir/$project/test.sh does not exist, please create it"
    exit 1
  fi

  # allow test.sh to fail without stopping this script
  set +e
  bash test.sh
  code=$?
  set -e

  echo ""
  echo "finished test.sh (code $code)"
  echo ""
  echo "-----------------------------"

  echo ""
  echo ""

  # confirm existence of correct engine
  echo "-------------- Checking Engines -------------------------------"
  if [ -z "${SKIP_ENGINE_CHECK+x}" ]; then
    bash ../../.github/scripts/check-engines-client.sh "$dir" "$project"
    bash ../../.github/scripts/check-engines-cli.sh "$dir" "$project"
  else
    echo "SKIP_ENGINE_CHECK=$SKIP_ENGINE_CHECK, skipping"
  fi
  echo "---------------------------------------------------------------"
fi

# TODO parse output of pnpm prisma -v --json for correct file/path

if [ -f "finally.sh" ]; then
  echo "-----------------------------"
  echo ""
  echo "finally script found, executing $dir/$project/finally.sh (with test exit code $code as param)"
  echo ""

  bash finally.sh $code

  echo ""
  echo "finished finally.sh"
  echo ""
  echo "-----------------------------"
fi

echo "$dir/$project done"

# back to store root, no matter what scripts did
cd "$root"

if [ "$GITHUB_REF" = "refs/heads/dev" ] || [ "$GITHUB_REF" = "refs/heads/integration" ] || [ "$GITHUB_REF" = "refs/heads/patch-dev" ] || [ "$GITHUB_REF" = "refs/heads/latest" ]; then
  branch="${GITHUB_REF##*/}"
  sha="$(git rev-parse HEAD | cut -c -7)"
  short_sha="$(echo "$sha" | cut -c -7)"
  commit_link="\`<https://github.com/prisma/ecosystem-tests/commit/$sha|$branch@$short_sha>\`"
  workflow_link="<https://github.com/prisma/ecosystem-tests/actions/runs/$GITHUB_RUN_ID|$project $matrix>"

  export webhook="$SLACK_WEBHOOK_URL"
  version="$(cat .github/prisma-version.txt)"
  sha="$(git rev-parse HEAD | cut -c -7)"

  emoji=":warning:"
  if [ $code -eq 0 ]; then
    emoji=":white_check_mark:"
  fi

  if [ $code -ne 0 ]; then
    export webhook="$SLACK_WEBHOOK_URL_FAILING"
    echo "notifying failing slack channel"
    node .github/slack/notify.js "prisma@$version: ${emoji} $workflow_link failed (via $commit_link)"
  fi
fi

echo "exitting with code $code"
exit $code
