#!/bin/sh

set -eu

DEPLOYMENT_URL=$( tail -n 1 deployment-url.txt )

export DEPLOYMENT_URL

echo $DEPLOYMENT_URL

pnpm test
