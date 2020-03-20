#!/bin/sh

set -eu

channel="$1"
version=$(sh .github/scripts/prisma-version.sh "$channel")

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

	echo "$version" > .github/prisma-version.txt

	## ACTION
	yarn add "prisma2@$channel" --dev
	yarn add "@prisma/client@$channel"
	## END

	echo "$item done"
	cd "$dir"
done
