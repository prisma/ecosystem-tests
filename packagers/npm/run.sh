#!/bin/sh

set -eu

# explicitly ignore the yarn lockfile here, npm will install the latest packages
# from the lockfile which will already ensure the correct prisma version gets fetched
npm install
npx prisma generate
npx prisma -v