#!/usr/bin/env bash

set -euxo pipefail

target_version=$1

node_package_version() {
  node -e "const pkg = require('./package.json'); console.log(pkg?.devDependencies?.['$1'] || pkg?.dependencies?.['$1'] || pkg?.resolutions?.['$1'] || '')"
}

deno_package_version() {
  node -e "const pkg = require('./deno.json'); console.log(pkg?.imports?.['$1']?.replace('npm:$1@', '') || '')"
}

update() {
  if [ -f package.json ]; then
    version=$(node_package_version "$1")
    if [ -n "$version" ]; then
      sed -i "s/$version/$target_version/g" package.json
    fi
  fi

  if [ -f deno.json ]; then
    version=$(deno_package_version "$1")
    if [ -n "$version" ]; then
      sed -i "s/$version/$target_version/g" deno.json
    fi
  fi
}

#
# Note: any changes below should be reflected to `ignoreDeps` in `renovate.json`
#

update "prisma"
update "@prisma/client"
update "@prisma/instrumentation"
update "@prisma/adapter-planetscale"
update "@prisma/adapter-pg"
update "@prisma/pg-worker"
update "@prisma/adapter-pg-worker"
update "@prisma/adapter-neon"
update "@prisma/adapter-libsql"
update "@prisma/adapter-d1"
