#!/bin/sh

set -eu

npm install
npx prisma generate
npx tsc
npx prisma -v
