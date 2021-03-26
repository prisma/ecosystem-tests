#!/bin/sh

set -eux

# gcloud CLI is not installed on macOS image of GH Actions, so install manually
UNAME=$(uname)
case "${UNAME}" in
  Darwin*)
    brew install --cask google-cloud-sdk
    ;;
esac

printf "%s" "$GCP_FUNCTIONS_SECRET" > key.json
gcloud auth activate-service-account --key-file key.json
gcloud config set project "$GCP_FUNCTIONS_PROJECT"
