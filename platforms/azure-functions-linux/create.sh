#!/bin/sh

set -eux

app="prisma-e2e-linux-test-azure-functions-is-so-amazing"
group="prisma-e2e-linux"
storage="e2estorageprismalinux"


yarn install
yarn prisma generate
yarn tsc

az group create --name "$group" --location westeurope
az storage account create --name "$storage" --location westeurope --resource-group "$group" --sku Standard_LRS
