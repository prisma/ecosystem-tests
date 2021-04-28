#!/bin/sh

set -eux

group="prisma-e2e-linux"
storage="prismae2elinuxstorage" # only a-z0-9 in this string :(

az group create --name "$group" --location westeurope
az storage account create --name "$storage" --location westeurope --resource-group "$group" --sku Standard_LRS
