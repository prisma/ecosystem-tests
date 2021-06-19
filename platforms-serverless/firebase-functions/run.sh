#!/bin/sh

set -eux

func="e2e_firebase_test_$(date "+%Y_%m_%d_%H%M%S")" # note weird naming here
echo "$func" > func-tmp.txt

cd functions/ && sh prepare_in_project.sh "$func" && cd ..

# Use project config to transmit env vars, that are set as env vars in index.ts of project
firebase functions:config:set prisma.db="$FIREBASE_FUNCTIONS_PG_URL" prisma.napi="$PRISMA_FORCE_NAPI"

firebase deploy --token "$FIREBASE_TOKEN" --only "functions:$func"
