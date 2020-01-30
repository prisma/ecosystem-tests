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

set +e
echo "function deploy start"
gcloud functions deploy prisma-e2e --runtime nodejs10 --trigger-http --entry-point=handler --allow-unauthenticated --source . --verbosity debug --set-env-vars GCP_FUNCTIONS_PG_URL=$GCP_FUNCTIONS_PG_URL
code=$?
echo "function deploy end"
set -e

if [ "$code" != "0" ]; then
	# wait for logs
	sleep 30

	echo "function logs start"
	gcloud functions logs read prisma-e2e
	echo "function logs end"

	echo "function deploy failed, see logs above"
	exit $code
fi

set +e
sh test.sh
code=$?
set -e

# wait for logs
sleep 30

echo "function logs start"
gcloud functions logs read prisma-e2e
echo "function logs end"

exit $code
