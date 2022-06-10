#!/bin/sh

set -eux

yarn install
yarn prisma generate
yarn tsc

app="azure-function-linux-e2e-test-$(date "+%Y-%m-%d-%H%M%S")"
echo "$app" > func-tmp.txt

group="prisma-e2e-linux"
storage="prismae2elinuxstorage"

# Runtime versions details at https://docs.microsoft.com/en-us/azure/azure-functions/functions-versions?tabs=in-process%2Cazure-cli%2Cv4&pivots=programming-language-javascript#languages
# 4 = Is the "Recommended runtime version for functions in all languages." and has GA Node.js 14 & 16
az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Linux --functions-version 4
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DATABASE_URL=$DATABASE_URL"

sleep 30

# give function folder our new app name
mv "func-placeholder" "$app"

yarn func azure functionapp publish "$app" --force
