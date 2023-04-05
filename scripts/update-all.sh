#! /bin/sh

echo "$1" > .github/prisma-version.txt

pnpm -rc --parallel exec "$(pwd)/scripts/update-project.sh $1"
