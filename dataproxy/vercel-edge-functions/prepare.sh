#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy vercel-edge-functions build'

source ../../utils/crypto/setEnv.sh VERCEL_DATA_PROXY_URL VERCEL_EDGE_FUNCTIONS_PROJECT_ID

# we set the vercel project & organization environment variables
export VERCEL_PROJECT_ID=$VERCEL_EDGE_FUNCTIONS_PROJECT_ID
export VERCEL_ORG_ID=$VERCEL_ORG_ID

# we tell prisma to generate with the dataproxy runtime enabled
export PRISMA_CLIENT_ENGINE_TYPE=dataproxy
