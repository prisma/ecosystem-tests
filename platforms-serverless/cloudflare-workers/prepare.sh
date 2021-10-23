#!/usr/bin/env bash

source ../../utils/crypto/envVars.sh CF_ACCOUNT_ID CF_API_TOKEN

echo $CF_ACCOUNT_ID
echo $CF_API_TOKEN

wrangler publish