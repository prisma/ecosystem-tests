#! /bin/sh
set -eux

# Pin to v9.
# see https://r.pnpm.io/comp
# corepack install --global pnpm@9
# Legacy command
corepack prepare pnpm@9.15.8 --activate
corepack enable

# pnpm -v

# Setting NODE_OPTIONS="" disables yarn-injected shenanigans so we can use package from the root
PROJECT_PACKAGE_MANAGER=$(NODE_OPTIONS="" node -e "require('@antfu/ni').detect({ autoinstall: false }).then(console.log)")

IS_GENERATED_CLIENT=$(node -e "
  try {
    const pkg = require('./package.json')
    console.log(pkg.name === 'prisma-client')
  } catch {
    console.log(false)
  }
")

if [ "$IS_GENERATED_CLIENT" = "true" ]; then
    exit 0
fi

if [ "$PROJECT_PACKAGE_MANAGER" = "yarn" ] || [ "$PROJECT_PACKAGE_MANAGER" = "yarn@berry" ]; then
    export YARN_ENABLE_SCRIPTS=0
    export YARN_ENABLE_IMMUTABLE_INSTALLS=0
    # we try yarn 10 times max because it can happen that something goes wrong along the way
    for i in $(seq 1 10); do echo "yarn try n°$i" && yarn && break || sleep $((2*$i)); done
    exit 0
fi

if [ "$PROJECT_PACKAGE_MANAGER" = "npm" ]; then
    npm install --package-lock-only
    exit 0
fi

if [ "$PROJECT_PACKAGE_MANAGER" = "pnpm" ]; then
    pnpm install --lockfile-only
    exit 0
fi

if [ "$PROJECT_PACKAGE_MANAGER" = "deno" ]; then
    deno install
    exit 0
fi


echo "Could not determine package manager at $(pwd)"
exit 1
