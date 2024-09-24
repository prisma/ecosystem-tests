#!/bin/sh

set -eu

cat deployment-logs.txt
export DEPLOYMENT_URL=$(cat deployment-logs.txt | grep -Eo "(https.*)\.pages\.dev$" --color=never)
echo $DEPLOYMENT_URL

pnpm test
