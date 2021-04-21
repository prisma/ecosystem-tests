#!/bin/sh

set -eux

app="$(cat func-tmp.txt)"

group="prisma-e2e-linux"

# az functionapp delete --name "$app" --resource-group "$group"
