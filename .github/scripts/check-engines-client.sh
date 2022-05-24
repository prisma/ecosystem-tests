#!/bin/bash

echo "-------------- Checking Generated Client QE Engine --------------"

dir=$1
project=$2

DEFAULT_CLIENT_ENGINE_TYPE='library'

# Check to see if the env var "PRISMA_CLIENT_ENGINE_TYPE" is set if not then using the default
if [ -z "$PRISMA_CLIENT_ENGINE_TYPE" ]; then
  echo "Using default client engine: $DEFAULT_CLIENT_ENGINE_TYPE"
  CLIENT_ENGINE_TYPE=$DEFAULT_CLIENT_ENGINE_TYPE
else
  echo "Using env(PRISMA_CLIENT_ENGINE_TYPE): $PRISMA_CLIENT_ENGINE_TYPE"
  CLIENT_ENGINE_TYPE=$PRISMA_CLIENT_ENGINE_TYPE
fi

# These are skipping for a variety of reasons like:
# - Custom project structure
# - Custom output location
# - They do not generate a client
# TODO Adapt tests so they also work here, or adapt project to fit into the mold
skipped_projects=(
  prisma-dbml-generator                   # No generated Client, so only Client stub with no engine included
  prisma-json-schema-generator            # No generated Client, so only Client stub with no engine included
  engine-types                            #
  pkg                                     # No generated Client, so only Client stub with no engine included
  aws-graviton                            # No local project at all (everything happens on server), so no `prisma` or `node_modules
  firebase-functions                      # No local project at expected location (but in `functions` subfolder)
  studio                                  # TODO: No generated Client in `node_modules/.prisma/client/`
  netlify-cli                             # Client is generated into `../functions/generated/client` via use of `output`
  jest-with-multiple-generators           # No generated Client locally in default path, both Clients have custom `output`
  generate-client-install-on-sub-project  # Client is generated into a subfolder
  pnpm-workspaces-custom-output           # Client is generated into a subfolder
  pnpm-workspaces-default-output          # Client is generated into a subfolder
  webpack-browser-custom-output           # Client is generated into a subfolder
  m1-macstadium                           # No local project at all (everything happens on server), so no `prisma` or `node_modules
  vercel-with-redwood                     # Yarn workspace with prisma generated in ./api
  yarn3-workspaces-pnp                    # Client is generated into a subfolder
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
echo "CLIENT_ENGINE_TYPE == $CLIENT_ENGINE_TYPE"

if [ $CLIENT_ENGINE_TYPE == "binary" ]; then
  echo "Binary: Enabled"
  case $os_name in
    linux)
      qe_location="node_modules/.prisma/client/query-engine-debian-openssl-1.1.x"
      ;;
    osx)
      qe_location="node_modules/.prisma/client/query-engine-darwin"
      ;;
    windows)
      qe_location="node_modules\.prisma\client\query-engine-windows.exe"
      ;;
  esac
elif [ $CLIENT_ENGINE_TYPE == "library" ]; then
  echo "Library: Enabled"
  case $os_name in
    linux)
      qe_location="node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node"
      ;;
    osx)
      qe_location="node_modules/.prisma/client/libquery_engine-darwin.dylib.node"
      ;;
    windows*)
      qe_location="node_modules\.prisma\client\query_engine-windows.dll.node"
      ;;
    *)
      os_name=notset
      ;;
  esac
elif [ $CLIENT_ENGINE_TYPE == "dataproxy" ]; then
  echo "DataProxy: Enabled"
else
  echo "❌ CLIENT_ENGINE_TYPE was not set"
  exit 1
fi

echo "--- ls -lh node_modules/.prisma/client/ ---"
ls -lh node_modules/.prisma/client/
echo "---"
if [ $CLIENT_ENGINE_TYPE == "dataproxy" ]; then
  echo "✔ Data Proxy has no Query Engine" # TODO: actually check that there isn't one
elif [ -f "$qe_location" ]; then
  echo "✔ Correct Query Engine exists"
else
  echo "❌ Could not find Query Engine in ${qe_location} when using ${os_name}"
  exit 1
fi
