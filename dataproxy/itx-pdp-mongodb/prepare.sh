#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy itx-pdp-mongodb build'

source ../../utils/crypto/setEnv.sh ITX_PDP_MONGODB
source ../../utils/crypto/setEnv.sh ITX_PDP_MONGODB_DATABASE_URL

