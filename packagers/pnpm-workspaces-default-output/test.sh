#!/bin/sh

FILE1=sub-project-1/generated/client.ts
FILE2=sub-project-2/generated/client.ts

set -eux

cd workspace/sub-project-1
FILE0=$(node -e "console.log(path.join(require.resolve('@prisma/client/package.json'), '..', '..', '..', '.prisma'))")

if [ -f "$FILE1" ] || [ -f "$FILE2" ]; then
    echo "Client should not generate in sub-folder"; exit 1;
fi;

if [ ! -d "$FILE0" ]; then
    echo "Client did not generate"; exit 1;
fi;

pnpm -r run cmd
