#!/bin/sh

set -eux

echo "DATABASE_URL:"
echo "$DATABASE_URL"

yarn install
yarn prisma generate
yarn tsc

# make sure database exists
npx prisma db push --force-reset --accept-data-loss

app="azure-function-linux-e2e-test-$(date "+%Y-%m-%d-%H%M%S")"
echo "$app" > func-tmp.txt

# give function folder our new app name
mv "func-placeholder" "$app"

group="prisma-e2e-linux"
storage="prismae2elinuxstorage"

az functionapp create --resource-group "$group" --consumption-plan-location westeurope --name "$app" --storage-account "$storage" --runtime "node" --os-type Linux
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DEBUG=*"
az functionapp config appsettings set --name "$app" --resource-group "$group" --settings "DATABASE_URL=$DATABASE_URL"

sleep 30
yarn func azure functionapp publish "$app" --force
