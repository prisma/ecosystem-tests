#!/bin/sh

set -eux

ID=$(date +%s%N)
echo $ID > id.txt
export CORE_FEATURES_DB_SEED_URL="$CORE_FEATURES_DB_SEED_URL$ID"

yarn install
yarn prisma generate

yarn prisma db push
