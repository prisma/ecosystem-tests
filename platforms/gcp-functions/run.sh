#!/bin/sh

set -eux

# just make sure this variable is set because gcloud expects it to be set
echo "$GCP_FUNCTIONS_ACCOUNT"

yarn set version latest

yarn install

yarn prisma2 generate

yarn tsc

func="e2e-test-$(date "+%s")"
echo "$func" > func-tmp.txt

gcloud functions deploy "$func" --runtime nodejs10 --trigger-http --entry-point=handler --allow-unauthenticated --verbosity debug --set-env-vars GCP_FUNCTIONS_PG_URL=$GCP_FUNCTIONS_PG_URL
