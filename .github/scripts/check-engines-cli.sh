#!/bin/bash

echo "-------------- Checking CLI/Engines QE Engine --------------"

DIR=$1
PROJECT=$2

DEFAULT_CLI_QUERY_ENGINE_TYPE='library'

# Check to see if the env var "PRISMA_CLI_QUERY_ENGINE_TYPE" is set if not then using the default
if [ -z "$PRISMA_CLI_QUERY_ENGINE_TYPE" ]; then
  echo "Using default cli qe: $DEFAULT_CLI_QUERY_ENGINE_TYPE"
  CLI_QUERY_ENGINE_TYPE=$DEFAULT_CLI_QUERY_ENGINE_TYPE
else
  echo "Using env(PRISMA_CLI_QUERY_ENGINE_TYPE): $PRISMA_CLI_QUERY_ENGINE_TYPE"
  CLI_QUERY_ENGINE_TYPE=$PRISMA_CLI_QUERY_ENGINE_TYPE
fi

# These are skipping because they have different project structures
# TODO Adapt tests so they also work here, or adapt project to fit into the mold
skipped_projects=(
  aws-graviton                    # No local project at all (everything happens on server), so no `prisma` or `node_modules
  firebase-functions              # No local project at expected location (but in `functions` subfolder)
  m1-macstadium                   # No local project at all (everything happens on server), so no `prisma` or `node_modules
  pnpm                            # Current logic does not work with pnpm hoisitng
  pnpm-workspaces-custom-output   # Current logic does not work with pnpm hoisitng
  pnpm-workspaces-default-output  # Current logic does not work with pnpm hoisitng
  yarn3-workspaces-pnp            # Current logic does not work with pnp hoisitng
)

case "${skipped_projects[@]}" in  *$2*)
  echo "Skipping as $2 is present in skipped_projects"
  exit 0
  ;;
esac

case $(uname | tr '[:upper:]' '[:lower:]') in
  linux*)
    os_name=linux
    ;;
  darwin*)
    os_name=osx
    ;;
  msys*)
    os_name=windows
    ;;
  *)
    os_name=windows
    ;;
esac

echo "Assumed OS: $os_name"
echo "CLI_QUERY_ENGINE_TYPE == $CLI_QUERY_ENGINE_TYPE"

if [ $CLI_QUERY_ENGINE_TYPE == "binary" ]; then
  echo "Binary: Enabled"
  case $os_name in
    linux)
      qe_location="node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x"
      qe_location2="node_modules/prisma/node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x"
      ;;
    osx)
      qe_location="node_modules/@prisma/engines/query-engine-darwin"
      qe_location2="node_modules/prisma/node_modules/@prisma/engines/query-engine-darwin"
      ;;
    windows)
      qe_location="node_modules\@prisma\engines\query-engine-windows.exe"
      qe_location2="node_modules\prisma\node_modules\engines\query-engine-windows.exe"
      ;;
  esac
elif [ $CLI_QUERY_ENGINE_TYPE == "library" ]; then
  echo "Library: Enabled"
  case $os_name in
    linux)
      qe_location="node_modules/@prisma/engines/libquery_engine-debian-openssl-1.1.x.so.node"
      qe_location2="node_modules/prisma/node_modules/@prisma/engines/libquery_engine-debian-openssl-1.1.x.so.node"
      ;;
    osx)
      qe_location="node_modules/@prisma/engines/libquery_engine-darwin.dylib.node"
      qe_location2="node_modules/prisma/node_modules/@prisma/engines/libquery_engine-darwin.dylib.node"
      ;;
    windows*)
      qe_location="node_modules\@prisma\engines\query_engine-windows.dll.node"
      qe_location2="node_modules\prisma\node_modules\engines\query_engine-windows.dll.node"
      ;;
  esac
elif [ $CLI_QUERY_ENGINE_TYPE == "<dataproxy>" ]; then
  echo "DataProxy: Enabled"
else
  echo "❌ CLI_QUERY_ENGINE_TYPE was not set"
  exit 1
fi


echo "--- yarn prisma -v ---"
yarn -s prisma -v
echo "--- ls -lh node_modules/@prisma/engines/ ---"
ls -lh node_modules/@prisma/engines/
echo "--- ls -lh node_modules/prisma/ ---"
ls -lh node_modules/prisma/
echo "---"

# TODO Add test that makes sure not _wrong_ files are present as well
# Example: `community-generators (napi, prisma-dbml-generator)` has correct node_modules/prisma/libquery_engine-debian-openssl-1.1.x.so.node, but wrong node_modules/@prisma/engines/query-engine-debian-openssl-1.1.x (also `community-generators (napi, prisma-json-schema-generator)`)
if [ "$CLI_QUERY_ENGINE_TYPE" == "<dataproxy>" ]; then
  echo "✔ Data Proxy has no Query Engine" # TODO: actually check that there isn't one
elif [ -f "$qe_location" ] || [ -f "$qe_location2" ]; then
  echo "✔ Correct Query Engine exists"
else
  echo "❌ Could not find Query Engine in ${qe_location} or ${qe_location2} when using ${os_name}"
  exit 1
fi
