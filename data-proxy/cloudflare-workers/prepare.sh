#!/usr/bin/env bash

source ../../utils/crypto/envVars.sh CF_ACCOUNT_ID CF_API_TOKEN CF_DATA_PROXY_URL

# we add the data proxy URL into the configuration file directly
echo "CF_DATA_PROXY_URL=\"$CF_DATA_PROXY_URL\"" >> wrangler.toml
