#!/bin/sh

set -eu

version="$1"

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

	## ACTION
	yarn add "prisma2@$version" --dev
	yarn add "@prisma/client@$version"
	## END

	echo "$item done"
	cd "$dir"
done
