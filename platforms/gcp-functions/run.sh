#!/bin/sh

set -eux

# this just verifies environment variables are set
x="$GCP_FUNCTIONS_PG_URL"
x="$GCP_FUNCTIONS_PROJECT"
x="$GCP_FUNCTIONS_SECRET"

printf "%s" "$GCP_FUNCTIONS_SECRET" > key.json
gcloud auth activate-service-account --key-file key.json
gcloud config set project "$GCP_FUNCTIONS_PROJECT"

yarn install

yarn prisma2 generate

yarn tsc

gcloud functions deploy prisma-e2e --runtime nodejs10 --trigger-http --entry-point=handler --allow-unauthenticated --source . --verbosity debug --set-env-vars GCP_FUNCTIONS_PG_URL=$GCP_FUNCTIONS_PG_URL

sh test.sh
