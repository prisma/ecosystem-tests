#!/bin/bash

echo "-------------- Checking Generated Client QE Binary --------------"

dir=$1
project=$2

# These are skipping for a variaty of reasons like:
# - Custom project structure
# - Custom output location
# - They do not generate a client
# TODO Adapt tests so they also work here, or adapt project to fit into the mold
skipped_projects=(
  prisma-dbml-generator                   # No generated Client, so only Client stub with no engine included
  prisma-json-schema-generator            # No generated Client, so only Client stub with no engine included
  napi-preview-feature                    #
  pkg                                     # No generated Client, so only Client stub with no engine included
  aws-graviton                            # No local project at all (everything happens on server), so no `prisma` or `node_modules
  firebase-functions                      # No local project at expected location (but in `functions` subfolder)
  studio                                  # TODO: No generated Client in `node_modules/.prisma/client/`
  netlify-cli                             # Client is generated into `../functions/generated/client` via use of `output`
  jest-with-multiple-generators           # No generated Client locally in default path, both Clients have custom `output`
  generate-client-install-on-sub-project  # Client is generated into a subfolder
  pnpm-workspaces-custom-output           # Client is generated into a subfolder
  pnpm-workspaces-default-output          # Client is generated into a subfolder
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

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  echo "Node-API: Disabled"
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
else
  echo "Node-API: Enabled"
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
fi

echo "--- ls node_modules/.prisma/client/ ---"
ls node_modules/.prisma/client/
echo "---"
if [ -f "$qe_location" ] ; then
  echo "✔ Correct Query Engine exists"
else
  echo "❌ Could not find Query Engine in ${qe_location} when using ${os_name}"
  exit 1
fi
