#!/bin/sh

set -eux

cd .github/slack/
yarn install
cd ../..

npm i -g json

branch="$1"

no_negatives() {
  echo "$(($1 < 0 ? 0 : $1))"
}

run_sync() {
  dir="$1"
  branch="$2"
  cd "$dir"
  sh .github/scripts/sync.sh "$branch"
  echo "synced, exit."
  exit 0
}

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

# prepare script: read package.json but ignore workspace package.json files
pkg="var pkg=require('./package.json'); if (pkg.workspaces || pkg.name == '.prisma/client') { process.exit(0); }"

# since GH actions are limited to 5 minute cron jobs, just run this continuously for 5 minutes
minutes=5   # cron job runs each x minutes
interval=10 # run each x seconds
i=0
count=$(((minutes * 60) / interval))
echo "running loop $count times"
while [ $i -le $count ]; do
  # increment to prevent forgetting incrementing, and also prevent overlapping with the next 5-minute job
  i=$((i + 1))
  echo "run $i"

  start=$(date "+%s")

  dir=$(pwd)

  git fetch github "$branch"
  git reset --hard "github/$branch"
  packages=$(find . -not -path "*/node_modules/*" -type f -name "package.json")

  echo "checking info..."

  v=$(sh .github/scripts/prisma-version.sh "$branch")

  echo "$packages" | tr ' ' '\n' | while read -r item; do
    echo "checking $item"

    case "$item" in
    *".github"* | *"functions/generated/client"*)
      echo "ignoring $item"
      continue
      ;;
    esac

    cd "$(dirname "$item")/"

    hasResolutions="$(node -e "$pkg;console.log(!!pkg.resolutions)")"

    if [ "$hasResolutions" = "true" ]; then
      vCLI="$(node -e "$pkg;console.log(pkg.resolutions['@prisma/cli'])")"

      if [ "$vCLI" != "" ]; then
        if [ "$v" != "$vCLI" ]; then
          if [ "$branch" != "dev" ]; then
            run_sync "$dir" "$branch"
          fi

          echo "$item: @prisma/cli expected $v, actual $vCLI"
          json -I -f package.json -e "this.resolutions['@prisma/cli']='$v'"
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
      vCLI="$(node -e "$pkg;console.log(pkg.devDependencies['@prisma/cli'])")"

      if [ "$vCLI" != "" ]; then
        if [ "$v" != "$vCLI" ]; then
          if [ "$branch" != "dev" ]; then
            run_sync "$dir" "$branch"
          fi

          echo "$item: @prisma/cli expected $v, actual $vCLI"
          yarn add "@prisma/cli@$v" --dev
        fi

        vPrismaClient="$(node -e "$pkg;console.log(pkg.dependencies['@prisma/client'])")"

        if [ "$v" != "$vPrismaClient" ]; then
          if [ "$branch" != "dev" ]; then
            run_sync "$dir" "$branch"
          fi

          echo "$item: @prisma/client expected $v, actual $vPrismaClient"
          yarn add "@prisma/client@$v"
        fi
      fi
    fi

    cd "$dir"
  done

  echo "after upgrade:"
  git status

  if [ -z "$(git status -s)" ]; then
    echo "no changes"
    end=$(date "+%s")
    diff=$(echo "$end - $start" | bc)
    remaining=$((interval - 1 - diff))
    echo "took $diff seconds, sleeping for $remaining seconds"
    sleep "$(no_negatives $remaining)"

    continue
  fi

  echo "changes, upgrading..."
  echo "$v" > .github/prisma-version.txt

  git commit -am "chore(packages): bump @prisma/cli to $v"

  git pull github "$branch" --rebase

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

  end=$(date "+%s")
  diff=$(echo "$end - $start" | bc)
  remaining=$((interval - 1 - diff))
  # upgrading usually takes longer than a few individual loop runs, so skip test runs which would have passed by now
  skip=$((remaining / interval))
  i=$((i - skip))
  echo "took $diff seconds, skipping $skip x $interval second runs"
done

echo "done"
