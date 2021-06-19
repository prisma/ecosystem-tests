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
  prisma-dbml-generator         # No generated Client, so only Client stub with no engine included
  prisma-json-schema-generator  # No generated Client, so only Client stub with no engine included
  napi-preview-feature          # TODO: Client has binary instead of library, CLI already has both - INVESTIGATE!
  pkg                           # No generated Client, so only Client stub with no engine included
  aws-graviton                  # No local project at all (everything happens on server), so no `prisma` or `node_modules
  #firebase-functions            # TODO: binary only: "ls: cannot access 'node_modules/.prisma/client/': No such file or directory" - no local node_modules as local installation happens in sub folder - Fix script if possible!
  studio                        # TODO: No generated Client in `node_modules/.prisma/client/`
  #netlify-cli                   # TODO: binary only: No generated Client locally - Investigate why!?
  jest-with-multiple-generators # No generated Client locally in default path, both Clients have custom `output`
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
  echo "N-API: Disabled"
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
  echo "N-API: Enabled"
  case $os_name in
    linux)
      qe_location="node_modules/.prisma/client/libquery_engine_napi-debian-openssl-1.1.x.so.node"
      ;;
    osx)
      qe_location="node_modules/.prisma/client/libquery_engine_napi-darwin.dylib.node"
      ;;
    windows*)
      qe_location="node_modules\.prisma\client\query_engine_napi-windows.dll.node"
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
