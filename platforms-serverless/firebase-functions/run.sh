#!/bin/sh

set -eux

func="e2e_firebase_test_$(date "+%Y_%m_%d_%H%M%S")" # note weird naming here
echo "$func" > func-tmp.txt

# When PRISMA_FORCE_NAPI is set, overwrite existing schema file with one that enables the napi preview feature
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  # use the default schema at prisma/schema.prisma file
  true
else
  cp ./functions/prisma/schema-with-napi.prisma ./functions/prisma/schema.prisma
fi

cd functions/ && sh prepare_in_project.sh "$func" && cd ..

firebase functions:config:set prisma.db="$DATABASE_URL"

firebase deploy --token "$FIREBASE_TOKEN" --only "functions:$func"
