#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy itx-pdp-postgresql build'

source ../../utils/crypto/setEnv.sh ITX_PDP_POSTGRESQL
source ../../utils/crypto/setEnv.sh ITX_PDP_POSTGRESQL_DATABASE_URL

