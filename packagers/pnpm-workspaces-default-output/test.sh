#!/bin/sh

FILE1=sub-project-1/node_modules/.prisma/client/index.js

set -eux

if [ ! -f "$FILE1" ]; then
    echo "Client did not generate"; exit 1;
fi;

pnpm -r run cmd
