#!/bin/sh

set -eu

action_start_time = $START_TIME
OUTPUT=$(yarn vercel logs e2e-vercel-api.vercel.app --token=$VERCEL_TOKEN --scope=prisma)
echo "${OUTPUT}"
echo "${OUTPUT}" | grep -q 'Generated Prisma Client' && echo 'Prisma Client Was Successfully Generated'
echo "${action_start_time}"
