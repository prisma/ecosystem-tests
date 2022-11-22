#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy itx-pdp-cockroachdb build'

source ../../utils/crypto/setEnv.sh ITX_PDP_COCKROACHDB
source ../../utils/crypto/setEnv.sh ITX_PDP_COCKROACHDB_DATABASE_URL

