#!/bin/sh

set -eux

# This file is only run in CI

# Note: see README about credentials
az login --service-principal -u "$AZURE_SP_NAME" -p "$AZURE_SP_PASSWORD" --tenant "$AZURE_SP_TENANT"
