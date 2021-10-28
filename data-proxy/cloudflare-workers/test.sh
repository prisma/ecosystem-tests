#!/bin/sh

set -eu

DEPLOYMENT_URL=$(cat deployment-url.txt | grep -Eo "(https.*$)" --color=never)

export DEPLOYMENT_URL

yarn test
