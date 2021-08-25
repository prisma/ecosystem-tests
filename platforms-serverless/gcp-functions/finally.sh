#!/bin/sh

set -eu

TEST_EXIT_CODE=$1

echo "sleep 30"
sleep 30

func="$(cat func-tmp.txt)"

echo "> output logs for function $func:"
gcloud functions logs read "$func"


if [ "$TEST_EXIT_CODE" -eq "0" ]; then
  # If tests passed

  echo "> delete function $func:"
  gcloud functions delete "$func" --quiet

else
  # If tests failed

  echo "Look at the logs of the failed function at: https://console.cloud.google.com/functions/details/us-central1/$func?project=$GCP_FUNCTIONS_PROJECT&tab=logs"
fi
