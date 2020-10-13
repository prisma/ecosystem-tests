#!/bin/sh

set -eux

app="prisma-e2e-linux-test-azure-functions-is-so-amazing"
group="prisma-e2e-linux"
storage="e2estorageprismalinux"

yarn install
yarn tsc

az group create --name "$group" --location westeurope
az storage account create --name "$storage" --location westeurope --resource-group "$group" --sku Standard_LRS
az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Linux
func azure functionapp publish "$app" --force
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "AZURE_FUNCTIONS_LINUX_PG_URL=$AZURE_FUNCTIONS_LINUX_PG_URL"
