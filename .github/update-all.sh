#!/bin/sh

set -eu

dir=$1

echo "running $dir tests"

packages=$(find "$dir" -not -path "*/node_modules/*" -type f -name "package.json")

channel="alpha"
v=$(sh .github/scripts/prisma-version.sh "$channel")

dir=$(pwd)

echo "$packages" | tr ' ' '\n' | while read -r item; do
	echo "running $item"

	case "$item" in
		*".github"*)
			echo "ignoring $item"
			continue
			;;
	esac

	cd "$(dirname "$item")/"

	## ACTION
	yarn add "prisma2@$v" --dev
	yarn add "@prisma/client@$v"
	## END

	echo "$item done"
	cd "$dir"
done
