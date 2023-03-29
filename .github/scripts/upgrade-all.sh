#!/bin/bash

set -eu
shopt -s inherit_errexit || true

version="$1"

echo "$version" > .github/prisma-version.txt

echo "upgrading all packages (upgrade-all.sh)"

packages=$(find "." -not -path "*/node_modules/*" -type f -name "package.json")

dir=$(pwd)

echo "$packages" | tr ' ' '\n' | while read -r item; do
  case "$item" in
  *"./package.json"* | *".github"* | *"functions/generated/client"*)
    echo "ignoring $item"
    continue
    ;;
  esac

 # do not update packages that don't use prisma
  if ! grep -q '"@prisma/client"\|"prisma"' "$item"; then
    echo "ignoring $item"
    continue
  fi

  echo ""
  echo "=========================="
  echo "> df -h"
  df -h

  echo "=========================="
  echo "running $item"
  cd "$(dirname "$item")/"

  pkg="var pkg=require('./package.json'); if (pkg.name == '.prisma/client') { process.exit(0); }"
  valid="$(node -e "$pkg;console.log('true')")"
  hasResolutions="$(node -e "$pkg;console.log(!!pkg.resolutions)")"

  if [ -f "upgrade.sh" ]; then
    echo "-----------------------------"
    echo ""
    echo "upgrade script found, executing $(pwd)/upgrade.sh"
    echo ""

    bash upgrade.sh

    echo ""
    echo "finished upgrade.sh"
    echo ""
    echo "-----------------------------"
  fi

  ## ACTION
  if [ "$hasResolutions" = "true" ]; then
    json -I -f package.json -e "this.resolutions['prisma']='$version'"
    json -I -f package.json -e "this.resolutions['@prisma/client']='$version'"
  elif [ "$valid" = "true" ]; then
    pnpm install --dev "prisma@$version" --lockfile-only
    pnpm install "@prisma/client@$version" --lockfile-only
  fi
  ## END

  echo "$item done"
  cd "$dir"
done

echo "done upgrading all packages (upgrade-all.sh)"
