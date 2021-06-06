#!/bin/sh

TEST_EXIT_CODE=$1

set -eux

app="$(cat func-tmp.txt)"

group="prisma-e2e-linux"

if [ "$TEST_EXIT_CODE" -eq "0" ]; then
    # If tests passed

    # delete function and logging of it
    az functionapp delete --name "$app" --resource-group "$group"

    az config set extension.use_dynamic_install=yes_without_prompt
    az monitor app-insights component delete --app "$app" --resource-group "$group"

else
    # If tests failed

    # move function code back to placeholder location, so we can try again
    mv "$app" "func-placeholder"

fi