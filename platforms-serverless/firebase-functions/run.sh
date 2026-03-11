#!/bin/sh

set -eux

pnpm install

func="e2e_firebase_test_$(date "+%Y_%m_%d_%H%M%S")" # note weird naming here
echo "$func" > func-tmp.txt
echo "$FIREBASE_PRIVATE_KEY" > "./privateKey.json"

cd functions/ && sh prepare_in_project.sh "$func" && cd ..

echo "$DATABASE_URL" > db_credentials.txt
GOOGLE_APPLICATION_CREDENTIALS="./privateKey.json" pnpm firebase functions:secrets:set PRISMA_DB --data-file db_credentials.txt --force

GOOGLE_APPLICATION_CREDENTIALS="./privateKey.json" pnpm firebase deploy --only "functions:firebase-functions:$func"
