#!/bin/sh

set -eux

app="$(cat func-tmp.txt)"

group="prisma-e2e-windows"

subscriptionId="63cbd994-4c44-4b0d-ba9f-463c6ec6ee31"

# az functionapp delete --name "$app" --resource-group "$group"

# az config set extension.use_dynamic_install=yes_without_prompt
# az monitor app-insights component delete --app "$app" --resource-group "$group"

echo "Too View Logs Visit"
echo "https://portal.azure.com/#blade/WebsitesExtension/FunctionMenuBlade/monitor/resourceId/%2Fsubscriptions%2F${subscriptionId}%2FresourceGroups%2F${group}%2Fproviders%2FMicrosoft.Web%2Fsites%2F${app}%2Ffunctions%2F${app}"
