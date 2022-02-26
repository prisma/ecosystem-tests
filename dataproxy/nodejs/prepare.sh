#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='e2e-tests dataproxy nodejs build'

source ../../utils/crypto/setEnv.sh NODEJS_DATA_PROXY_URL

# we tell prisma to generate with the dataproxy runtime enabled
export PRISMA_CLIENT_ENGINE_TYPE=dataproxy
