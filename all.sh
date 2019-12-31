#!/bin/sh

set -eu

dir=$1

echo "running $dir tests"

packages=$(find "$dir" -not -path "*/node_modules/*" -type f -name "run.sh")

dir=$(pwd)

echo "$packages" | tr ' ' '\n' | while read -r item; do
	echo "running $item"
	cd "$(dirname "$item")/"
	sh run.sh
	echo "$item done"
	cd "$dir"
done
