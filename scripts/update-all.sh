#! /bin/sh

set -eux

# for when runnig update-all.sh locally, we resolve the prisma version
NEW_VERSION=$(npm show prisma@$1 version)
echo "$NEW_VERSION" > .github/prisma-version.txt

# Pin to v9.
# see https://r.pnpm.io/comp
# corepack install --global pnpm@9
# Legacy command
corepack prepare pnpm@9.15.8 --activate
corepack enable # auto install correct yarn versions automatically

# pnpm -v

# first update all the versions in all the projects for perf gains
pnpm -rc --parallel exec "$(pwd)/scripts/update-version.sh $NEW_VERSION"
# then update all the lockfiles by running the package managers
pnpm -rc exec "$(pwd)/scripts/update-locks.sh $NEW_VERSION"
# doing the two separately is important as it also allows us to update the
# lockfiles in parallel, while also handling monorepo/workspaces correctly
