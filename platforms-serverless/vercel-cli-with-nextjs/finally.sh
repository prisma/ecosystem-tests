#!/bin/sh

set -eux

cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
yarn -s vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=prisma
