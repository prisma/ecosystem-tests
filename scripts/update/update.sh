#! /bin/sh

set -eux

HAS_UPDATE=0

while [ $HAS_UPDATE -eq 0 ]
do
  pnpm install -w prisma@$1 --lockfile-only
  git diff --exit-code --quiet
done
