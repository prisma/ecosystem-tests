#!/bin/sh

set -eux

app="$(cat func-tmp.txt)"

group="prisma-e2e-windows-new"
storage="prismae2estoragewinnew"

az functionapp delete --name "$app" --resource-group "$group"
