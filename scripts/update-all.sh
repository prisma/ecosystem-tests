#! /bin/sh

NEW_VERSION=$(npm show prisma@$1 version)
echo "$NEW_VERSION" > .github/prisma-version.txt

pnpm -rc --parallel exec "$(pwd)/scripts/update-version.sh $NEW_VERSION"
pnpm -rc --parallel exec "$(pwd)/scripts/update-locks.sh $NEW_VERSION"
