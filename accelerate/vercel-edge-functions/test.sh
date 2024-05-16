#!/usr/bin/env bash

set -eu

DEPLOYMENT_URL=$(cat deployment-url.txt | grep -Eo "(https.*$)" --color=never)

export DEPLOYMENT_URL

echo $DEPLOYMENT_URL

pnpm test
