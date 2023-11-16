#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate

ls -l ./prisma/client/
cat ./prisma/client/edge.js

pnpm wrangler deploy | tee deployment-logs.txt
