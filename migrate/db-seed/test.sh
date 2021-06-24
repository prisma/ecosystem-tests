#!/bin/sh

set -eux

ID=$( tail -n 1 id.txt )
export CORE_FEATURES_DB_SEED_URL="$CORE_FEATURES_DB_SEED_URL$ID"

yarn prisma db pull --print
yarn prisma db seed --preview-feature
yarn test
