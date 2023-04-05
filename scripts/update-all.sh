#! /bin/sh

NEW_VERSION=$(npm show prisma@$1 version)
echo "$NEW_VERSION" > .github/prisma-version.txt

pnpm -rc --parallel exec "$(pwd)/scripts/update-project.sh $NEW_VERSION"
