#!/bin/sh

set -eu

dir=$1

echo "running $dir tests"

packages=$(find "$dir" -not -path "*/node_modules/*" -type f -name "run.sh")

echo "$packages" | tr ' ' '\n' | while read -r item; do
	echo "running $item"
	cd "$GITHUB_WORKSPACE/$(dirname "$item")/"
	sh run.sh
	echo "$item done"
done
