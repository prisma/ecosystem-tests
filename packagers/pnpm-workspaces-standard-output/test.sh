#!/bin/sh

set -eux

test -f node_modules/.prisma/client/index.js

pnpm -r run cmd
