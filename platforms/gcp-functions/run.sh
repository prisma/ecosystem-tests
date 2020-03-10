#!/bin/sh

set -eux

yarn install

yarn prisma2 generate

yarn tsc

func="e2e-test-$(date "+%s")"

set +e
echo "function deploy start"
gcloud functions deploy "$func" --runtime nodejs10 --trigger-http --entry-point=handler --allow-unauthenticated --verbosity debug --set-env-vars GCP_FUNCTIONS_PG_URL=$GCP_FUNCTIONS_PG_URL
code=$?
echo "function deploy end"
set -e

if [ "$code" != "0" ]; then
	# wait for logs
	sleep 30

	echo "function logs start"
	gcloud functions logs read "$func"
	echo "function logs end"

	gcloud functions delete "$func" --quiet

	echo "function deploy failed, see logs above"
	exit $code
fi

set +e
sh test.sh "$func"
code=$?
set -e

# wait for logs
sleep 30

echo "function logs start"
gcloud functions logs read "$func"
echo "function logs end"

gcloud functions delete "$func" --quiet

exit $code
