#!/bin/sh

set -eux

yarn install
yarn prisma generate
yarn tsc

app="azure-function-win-e2e-test-$(date "+%Y-%m-%d-%H%M%S")"
echo "$app" > func-tmp.txt

group="prisma-e2e-windows"
storage="prismae2ewin6owsstorage" # required because of brand foo

az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Windows --functions-version 3
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DATABASE_URL=$DATABASE_URL"

sleep 30

# give function folder our new app name
mv "func-placeholder" "$app"

yarn func azure functionapp publish "$app" --force
