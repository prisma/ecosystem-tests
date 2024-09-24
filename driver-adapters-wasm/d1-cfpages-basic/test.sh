#!/bin/sh

set -eu

export DEPLOYMENT_URL=$(cat deployment-logs.txt | grep -Eo "(https.*)\.pages\.dev$" --color=never | head -1)
echo $DEPLOYMENT_URL

pnpm test
