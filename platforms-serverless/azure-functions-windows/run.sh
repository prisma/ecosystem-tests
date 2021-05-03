#!/bin/sh

set -eux

yarn install
yarn prisma generate
yarn tsc

app="azure-function-win-e2e-test-$(date "+%Y-%m-%d-%H%M%S")"
echo "$app" > func-tmp.txt

# give function folder our new app name
mv "func-placeholder" "$app"

group="prisma-e2e-windows"
storage="prismae2ewin6owsstorage"

az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Windows
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=* FUNCTIONS_EXTENSION_VERSION=~3 AZURE_FUNCTIONS_WINDOWS_PG_URL=$AZURE_FUNCTIONS_WINDOWS_PG_URL"

sleep 30
yarn func azure functionapp publish "$app" --force


