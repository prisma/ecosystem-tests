#!/bin/sh

FILE1=sub-project-1/generated/client.ts
FILE2=sub-project-2/generated/client.ts

set -eux

cd workspace

if [ ! -f "$FILE1" ] || [ ! -f "$FILE2" ]; then
    echo "Client did not generate"; exit 1;
fi;

pnpm -r run cmd
