#!/usr/bin/env bash

set -eux

export TMP_FILE=hyperdrive.tmp
export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests driver-adapters-wasm pg-cf-hyperdrive build'
export PRISMA_CLIENT_ENGINE_TYPE='wasm' # because setup otherwise makes it library/binary
export HYPERDRIVE_NAME='hyperdrive-pg-cf-hyperdrive'

# Delete a previous hyperdrive with the same name if exists, unfortunately wrangler output cannot
# be parsed as JSON, so we need to filter out the id from the output table. We do it in two steps
# to count with debugging output
#
# Example output of `wrangler hyperdrive list`:
#
# ```
# 📋 Listing Hyperdrive configs
# ┌──────────────────────────────────┬─────────────────────────────┬──────────────────────┬───────────────────────────────────────────────────────────────────────┬──────┬────────────────┬────────────────────┐
# │ id                               │ name                        │ user                 │ host                                                                  │ port │ database       │ caching            │
# ├──────────────────────────────────┼─────────────────────────────┼──────────────────────┼───────────────────────────────────────────────────────────────────────┼──────┼────────────────┼────────────────────┤
# │ 10f18adb82bb439286003f3432644351 │ hyperdrive-orm-tests        │ plum_colonial_alexia │ db-provision-postgres000000.0123456789ABC.us-east-1.rds.amazonaws.com │ 5432 │ maroon_raccoon │ {"disabled":false} │
# ├──────────────────────────────────┼─────────────────────────────┼──────────────────────┼───────────────────────────────────────────────────────────────────────┼──────┼────────────────┼────────────────────┤
# │ 01587912e35747f1ae8b70ac34402410 │ hyperdrive-pg-cf-hyperdrive │ plum_colonial_alexia │ db-provision-postgres000000.0123456789ABC.us-east-1.rds.amazonaws.com │ 5432 │ maroon_raccoon │ {"disabled":false} │
# ├──────────────────────────────────┼─────────────────────────────┼──────────────────────┼───────────────────────────────────────────────────────────────────────┼──────┼────────────────┼────────────────────┤
# │ 534276a870cd4d77bb386c5e09daeb39 │ pgtunnel                    │ plum_colonial_alexia │ db-provision-postgres000000.0123456789ABC.us-east-1.rds.amazonaws.com │ 5432 │ maroon_raccoon │ {"disabled":false} │
# └──────────────────────────────────┴─────────────────────────────┴──────────────────────┴───────────────────────────────────────────────────────────────────────┴──────┴────────────────┴────────────────────┘
# ```
npx wrangler hyperdrive list | tee $TMP_FILE
# Only try to delete if the hyperdrive exists
EXISTING_HYPERDRIVE_OUTPUT=$(grep $HYPERDRIVE_NAME $TMP_FILE)
if [ -n "$EXISTING_HYPERDRIVE_OUTPUT" ]; then
  echo "Existing hyperdrive with name $HYPERDRIVE_NAME - We will delete it..."
  echo "$EXISTING_HYPERDRIVE_OUTPUT" | cut -f2 -d' ' | xargs npx wrangler hyperdrive delete
else
  echo "✅ No existing hyperdrive with name $HYPERDRIVE_NAME - We can continue..."
fi

# Create the hyperdrive to connecto the Database. Unfortunately wrangler output mixes JSON and text, so we need to filter out
# the first two lines to parse the JSON.
#
# Example output of `wrangler hyperdrive create hyperdrive-orm-tests-foo --connection-string=$DATABASE_URL`:
#
# ```
# 🚧 Creating 'hyperdrive-orm-tests-foo'
# ✅ Created new Hyperdrive config
#  {
#   "id": "427135cd3b954fd89a264977a457f32d",
#   "name": "hyperdrive-orm-tests-foo",
#   "origin": {
#     "host": "db-provision-postgres0000000.0123456789ABC.us-east-1.rds.amazonaws.com",
#     "port": 5432,
#     "database": "maroon_raccoon",
#     "user": "plum_colonial_alexia"
#   },
#   "caching": {
#     "disabled": false
#   }
# }
# ```

# if DATABASE_URL is not set, exit
if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL is not set"
    exit 1
fi

npx wrangler hyperdrive create $HYPERDRIVE_NAME --connection-string=\"$DATABASE_URL\" | tee $TMP_FILE
export HYPERDRIVE_ID=$(cat $TMP_FILE | sed 1,2d | jq .id)

cat <<EOF > wrangler.toml
name = "pg-cf-hyperdrive"
main = "src/index.js"
compatibility_date = "2023-10-30"
node_compat = true

[[hyperdrive]]
binding = "HYPERDRIVE"
id = $HYPERDRIVE_ID
EOF

echo "✅ Configured wrangler.toml with hyperdrive id $HYPERDRIVE_ID"
echo ""
cat wrangler.toml
