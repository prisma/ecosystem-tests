#!/bin/sh

set -eu

dir=$1

echo "running $dir tests"

packages=$(find "$dir" -not -path "*/node_modules/*" -type f -name "package.json")

echo "$packages" | tr ' ' '\n' | while read -r item; do
	echo "running $item"
	cd "$(dirname "$item")/"
	sh run.sh
	echo "$item done"
done
