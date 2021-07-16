#!/bin/sh

TEST_EXIT_CODE=$1

set -eux

app="$(cat func-tmp.txt)"

group="prisma-e2e-linux"
subscriptionId="63cbd994-4c44-4b0d-ba9f-463c6ec6ee31"


if [ "$TEST_EXIT_CODE" -eq "0" ]; then
    # If tests passed

    # delete function and logging of it
    az functionapp delete --name "$app" --resource-group "$group"

    az config set extension.use_dynamic_install=yes_without_prompt
    az monitor app-insights component delete --app "$app" --resource-group "$group"

else
    # If tests failed
    echo "To view Logs visit"
    echo "https://portal.azure.com/#blade/WebsitesExtension/FunctionMenuBlade/monitor/resourceId/%2Fsubscriptions%2F${subscriptionId}%2FresourceGroups%2F${group}%2Fproviders%2FMicrosoft.Web%2Fsites%2F${app}%2Ffunctions%2F${app}"

    # move function code back to placeholder location, so we can try again
    mv "$app" "func-placeholder"

fi
