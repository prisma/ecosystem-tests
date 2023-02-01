#!/bin/sh

set -eu

DEPLOYED_URL=$( tail -n 1 deployment-url.txt )

yarn vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
