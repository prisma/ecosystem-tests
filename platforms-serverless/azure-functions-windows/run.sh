#!/bin/sh

set -eux

yarn install
yarn prisma generate
yarn tsc

app="azure-function-win-e2e-test-$(date "+%Y-%m-%d-%H%M%S")"
echo "$app" > func-tmp.txt

cp -r "func-placeholder" "$app"

group="prisma-e2e-windows-new"
storage="prismae2estoragewinnew"

az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Windows
sleep 60
yarn func azure functionapp publish "$app" --force
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "AZURE_FUNCTIONS_WINDOWS_PG_URL=$AZURE_FUNCTIONS_WINDOWS_PG_URL"

sleep 30
