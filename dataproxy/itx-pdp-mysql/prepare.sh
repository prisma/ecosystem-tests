#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy itx-pdp-mysql build'

source ../../utils/crypto/setEnv.sh ITX_PDP_MYSQL
source ../../utils/crypto/setEnv.sh ITX_PDP_MYSQL_DATABASE_URL

