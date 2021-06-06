#!/bin/sh

set -eux

func="e2e_firebase_test_$(date "+%Y_%m_%d_%H%M%S")" # note weird naming here
echo "$func" > func-tmp.txt

cd functions/ && sh prepare_in_project.sh "$func" && cd ..

firebase functions:config:set prisma.db="$FIREBASE_FUNCTIONS_PG_URL"
firebase deploy --token "$FIREBASE_TOKEN" --only "functions:$func"
