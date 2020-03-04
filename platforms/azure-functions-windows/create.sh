#!/bin/sh

set -eux

app="prisma-e2e-windows-test-new"
group="prisma-e2e-windows-new"
# "windows" as storage name is illegal due to trademark x)
storage="prismae2estoragewinnew"

yarn install
yarn prisma2 generate
yarn tsc

az group create --name "$group" --location westeurope
az storage account create --name "$storage" --location westeurope --resource-group "$group" --sku Standard_LRS
az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Windows
func azure functionapp publish "$app" --force
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "AZURE_FUNCTIONS_WINDOWS_PG_URL=$AZURE_FUNCTIONS_WINDOWS_PG_URL"
