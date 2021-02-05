#!/bin/sh

set -eu


OUTPUT=$(yarn vercel logs e2e-vercel-api.vercel.app --token=$VERCEL_TOKEN --scope=prisma)
echo "${OUTPUT}"
echo "${OUTPUT}" | grep -q 'Generated Prisma Client' && echo 'Prisma Client Was Successfully Generated'
