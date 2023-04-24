#!/bin/sh

set -eux

# Documentation
# https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-a-client-secret
# https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli

az ad sp create-for-rbac -n "Functions"

