#!/bin/sh

set -eux

az login --service-principal -u "$AZURE_SP_NAME" -p "$AZURE_SP_PASSWORD" --tenant "$AZURE_SP_TENANT"

yarn install
yarn prisma2 generate
yarn tsc

func azure functionapp publish "prisma-e2e-linux-test"

sh test.sh
