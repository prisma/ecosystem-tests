#!/bin.sh

set -eux

sh zip.sh

aws lambda update-function-code --function-name prisma2-e2e-tests --zip-file "fileb://lambda.zip"
yarn install --offline
