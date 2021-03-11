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
  *".github"* | *"yarn-workspaces/package.json"* | *"functions/generated/client"*)
    echo "ignoring $item"
    continue
    ;;
  esac
  
  echo ""
  echo "=========================="
  echo "> df -h"
  df -h


  echo "=========================="
  echo "running $item"
  cd "$(dirname "$item")/"

  pkg="var pkg=require('./package.json'); if (pkg.workspaces || pkg.name == '.prisma/client') { process.exit(0); }"
  valid="$(node -e "$pkg;console.log('true')")"
  hasResolutions="$(node -e "$pkg;console.log(!!pkg.resolutions)")"

  ## ACTION
  if [ "$hasResolutions" = "true" ]; then
    json -I -f package.json -e "this.resolutions['prisma']='$version'"
    json -I -f package.json -e "this.resolutions['@prisma/client']='$version'"
  elif [ "$valid" = "true" ]; then
    case "$item" in
    *"yarn2"*)
      yarn add "prisma@$version" --dev
      yarn add "@prisma/client@$version"
      ;;
    *)
      yarn add "prisma@$version" --dev --ignore-scripts
      yarn add "@prisma/client@$version" --ignore-scripts
      ;;
    esac
          
  fi
  ## END

  echo "$item done"
  cd "$dir"
done

echo "done upgrading all packages (upgrade-all.sh)"
