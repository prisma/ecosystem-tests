#!/bin.sh

set -eux

aws lambda update-function-configuration --function-name prisma2-e2e-tests --handler index.handler --timeout 10
