#!/bin/sh

set -eux

ls -lah

app="azure-function-win-e2e-test-$(date "+%s")"
echo "$app" > func-tmp.txt

ls -lah

ls -lah

yarn install
yarn prisma2 generate
yarn tsc

cp -r "func-placeholder" "$app"

ls -lah

group="prisma-e2e-windows-new"
storage="prismae2estoragewinnew"

ls -lah

az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Windows
func azure functionapp publish "$app" --force
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "AZURE_FUNCTIONS_WINDOWS_PG_URL=$AZURE_FUNCTIONS_WINDOWS_PG_URL"
