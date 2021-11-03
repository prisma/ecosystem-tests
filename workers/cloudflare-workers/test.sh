#!/bin/sh

set -eu

DEPLOYMENT_URL=$(cat deployment-url.txt | grep -Eo "(https.*$)" --color=never)

echo $ DEPLOYMENT_URL

export DEPLOYMENT_URL

yarn test
