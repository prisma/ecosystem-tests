#!/bin/sh

set -eu

yarn
VERCEL_PROJECT_ID=$VERCEL_API_PROJECT_ID
VERCEL_ORG_ID=$VERCEL_API_ORG_ID
yarn vercel --token=$VERCEL_TOKEN --prod --scope=prisma --confirm
sleep 15
