#!/bin/sh

set -eu

npm install
npx prisma generate
npx prisma -v