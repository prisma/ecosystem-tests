#!/bin/sh

set -eux

app="prisma-e2e-windows-another-test"
group="prisma-e2e-windows-new"
# "windows" as storage name is illegal due to trademark x)
storage="prismae2estoragewinnew"

az group create --name "$group" --location westeurope
az storage account create --name "$storage" --location westeurope --resource-group "$group" --sku Standard_LRS
