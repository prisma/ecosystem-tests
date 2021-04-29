#!/bin/sh

set -eux

app="$(cat func-tmp.txt)"

group="prisma-e2e-windows"

# az functionapp delete --name "$app" --resource-group "$group"

# az config set extension.use_dynamic_install=yes_without_prompt
# az monitor app-insights component delete --app "$app" --resource-group "$group"
