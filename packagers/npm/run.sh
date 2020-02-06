#!/bin/sh

set -eu

rm -rf prisma/migrations/
rm -rf prisma/dev.db

# explicitly ignore the yarn lockfile here, npm will install the latest packages
# from the lockfile which will already ensure the correct prisma version gets fetched
npm install
npx prisma2 generate
npm run cmd
