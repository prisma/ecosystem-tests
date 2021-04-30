#!/bin/sh

set -eux

group="prisma-e2e-windows"
storage="prismae2ewin6owsstorage" # "windows" as storage name is illegal due to trademark x) # only a-z0-9 in this string :(

az group create --name "$group" --location westeurope
az storage account create --name "$storage" --location westeurope --resource-group "$group" --sku Standard_LRS
