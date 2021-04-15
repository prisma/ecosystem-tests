#!/bin/sh

set -eux

printf "%s" "$GCP_FUNCTIONS_SECRET" > key.json
gcloud auth activate-service-account --key-file key.json
gcloud config set project "$GCP_FUNCTIONS_PROJECT"
