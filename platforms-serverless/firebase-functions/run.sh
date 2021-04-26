#!/bin/sh

set -eux

func="e2e_firebase_test_$(date "+%Y-%m-%d-%H%M%S")"
echo "$func" > func-tmp.txt

cd functions/ && sh prepare.sh "$func" && cd ..

firebase functions:config:set prisma.db="$FIREBASE_FUNCTIONS_PG_URL"
firebase deploy --token "$FIREBASE_TOKEN" --only "functions:$func"
