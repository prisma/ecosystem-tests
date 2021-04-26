#!/bin/sh

set -eux

yarn install
yarn prisma generate
yarn tsc

app="azure-function-linux-e2e-test-$(date "+%Y-%m-%d-%H%M%S")"
echo "$app" > func-tmp.txt

cp -r "func-placeholder" "$app"

group="prisma-e2e-linux"
storage="prismae2elinuxstorage"

az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Linux
sleep 60
yarn func azure functionapp publish "$app" --force
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "AZURE_FUNCTIONS_LINUX_PG_URL=$AZURE_FUNCTIONS_LINUX_PG_URL"

sleep 30
