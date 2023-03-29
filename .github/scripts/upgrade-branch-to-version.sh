#!/bin/bash

set -eu
shopt -s inherit_errexit || true

cd .github/slack/
pnpm install
cd ../..

npm i -g json

branch="$1"
version="$2" # TODO this is not actually used yet in this script

echo ""
echo "=========================="
echo "upgrade-branch-to-version.sh"
echo "branch: $branch"
echo "version: $version"

run_sync() {
  dir="$1"
  branch="$2"
  cd "$dir"
  bash .github/scripts/sync.sh "$branch"
  echo "synced, exit."
  exit 0
}

echo ""
echo "=========================="
echo "setting up ssh repo"

mkdir -p ~/.ssh
echo "$SSH_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git remote add github "git@github.com:$GITHUB_REPOSITORY.git"
git fetch github "$branch"
git reset --hard "github/$branch"
git checkout "github/$branch"

# prepare script: read package.json but ignore workspace package.json files, redwood "web" package.json file
pkg="var pkg=require('./package.json'); if (pkg.workspaces || pkg.name == '.prisma/client' || pkg.name == 'web') { process.exit(0); }"

# store pwd for later usage
dir=$(pwd)

echo "=========================="
echo "getting live package version:"
v=$(bash .github/scripts/prisma-version.sh "$branch")
if [ -z "$v" ]
then
      echo "Prisma version is empty: $v"
      exit 0
fi
echo "$v (via Npm)"

packages=$(find . -not -path "*/node_modules/*" -type f -name "package.json")
echo "$packages" | tr ' ' '\n' | while read -r item; do
  echo "=========================="
  echo "checking $item"

  case "$item" in
  *"./package.json"* | *".github"* | *"functions/generated/client"*)
    echo "ignoring $item"
    continue
    ;;
  esac

  cd "$(dirname "$item")/"

  hasResolutions="$(node -e "$pkg;console.log(!!pkg.resolutions)")"

  if [ "$hasResolutions" = "true" ]; then
    echo "note: project uses `resolutions`"
    vCLI="$(node -e "$pkg;console.log(pkg.resolutions['prisma'])")"

    if [ "$vCLI" != "" ]; then
      if [ "$v" != "$vCLI" ]; then
        if [ "$branch" != "dev" ]; then
          run_sync "$dir" "$branch"
        fi

        echo "$item: prisma expected $v, actual $vCLI"
        json -I -f package.json -e "this.resolutions['prisma']='$v'"
      fi

      vPrismaClient="$(node -e "$pkg;console.log(pkg.resolutions['@prisma/client'])")"

      if [ "$v" != "$vPrismaClient" ]; then
        if [ "$branch" != "dev" ]; then
          run_sync "$dir" "$branch"
        fi

        echo "$item: @prisma/client expected $v, actual $vPrismaClient"
        json -I -f package.json -e "this.resolutions['@prisma/client']='$v'"
      fi
    fi
  else
    vCLI="$(node -e "$pkg;console.log(pkg.devDependencies['prisma'])")"

    if [ "$vCLI" != "" ]; then
      if [ "$v" != "$vCLI" ]; then
        if [ "$branch" != "dev" ]; then
          run_sync "$dir" "$branch"
        fi

        echo "$item: prisma expected $v, actual $vCLI"
        echo "> pnpm install --dev \"prisma@$v\""
        pnpm install --dev "prisma@$v"
      fi

      vPrismaClient="$(node -e "$pkg;console.log(pkg.dependencies['@prisma/client'])")"

      if [ "$v" != "$vPrismaClient" ]; then
        if [ "$branch" != "dev" ]; then
          run_sync "$dir" "$branch"
        fi

        echo "$item: @prisma/client expected $v, actual $vPrismaClient"
        echo "> pnpm install \"@prisma/client@$v\""
        pnpm install "@prisma/client@$v"
      fi
    else
      echo "Dependency not found"
    fi
  fi

  cd "$dir"
done

echo ""
echo "=========================="
echo "after upgrade:"
git status

if [ -z "$(git status -s)" ]; then
  echo ""
  echo "=========================="
  echo "no changes, bye!"
  exit 0
fi
  
echo ""
echo "=========================="
echo "changes, upgrading..."
echo "$v" > .github/prisma-version.txt

git commit -am "chore(packages): bump prisma to $v"

set +e
git pull github "$branch" --rebase
code=$?
if [ $code -ne 0 ]; then
  export webhook="$SLACK_WEBHOOK_URL_FAILING"
  node .github/slack/notify.js "Prisma version $v :warning: Merge conflict at the end of check-for-update.sh script (via $branch)"
  exit 0
fi
set -e

set +e
git push github "HEAD:refs/heads/$branch"
code=$?
set -e
echo "pushed commit"

if [ $code -eq 0 ]; then
  export webhook="$SLACK_WEBHOOK_URL"
  node .github/slack/notify.js "Prisma version $v released (via $branch)"
  export webhook="$SLACK_WEBHOOK_URL_FAILING"
  node .github/slack/notify.js "Prisma version $v released (via $branch)"
fi

echo "done"
