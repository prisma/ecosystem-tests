#!/bin/sh

set -eu

packages=$(find . -not -path "*/node_modules/*" -type f -name "package.json")

echo "$packages" | tr ' ' '\n' | while read -r item; do
	cd "$(dirname "$item")/"
	sh run.sh
done
