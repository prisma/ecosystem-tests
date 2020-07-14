#!/bin/sh

set -eux

channel="$1"
version=$(sh .github/scripts/prisma-version.sh "$channel")

echo "$version" > .github/prisma-version.txt

echo "upgrading all packages"

packages=$(find "." -not -path "*/node_modules/*" -type f -name "package.json")

dir=$(pwd)

echo "$packages" | tr ' ' '\n' | while read -r item; do
	case "$item" in
		*".github"*|*"yarn-workspaces/package.json"*)
			echo "ignoring $item"
			continue
			;;
	esac

	echo "running $item"
	cd "$(dirname "$item")/"

  pkg="var pkg=require('./package.json'); if (pkg.workspaces || pkg.name == '.prisma/client') { process.exit(0); }"
	hasResolutions="$(node -e "$pkg;console.log(!!pkg.resolutions)")"

	## ACTION
	if [ "$hasResolutions" = "true" ]; then
	  v=$(sh .github/scripts/prisma-version.sh "$channel")
	  json -I -f package.json -e "this.resolutions['@prisma/cli']='$v'"
	  json -I -f package.json -e "this.resolutions['@prisma/client']='$v'"
	else
		yarn add "@prisma/cli@$channel" --dev
		yarn add "@prisma/client@$channel"
	fi
	## END

	echo "$item done"
	cd "$dir"
done
