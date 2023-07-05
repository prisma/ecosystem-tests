#! /bin/sh

rm -f .pnp.cjs # remove pnp file to prevent nodejs from using it

PROJECT_PACKAGE_MANAGER=$(node -e "require('@antfu/ni').detect({ autoinstall: false }).then(console.log)")
IS_GENERATED_CLIENT=$(node -e "const pkg = require('./package.json'); console.log(pkg.name === '.prisma/client')")

if [ "$IS_GENERATED_CLIENT" = "true" ]; then
    exit 0
fi

if [ "$PROJECT_PACKAGE_MANAGER" = "yarn" ] || [ "$PROJECT_PACKAGE_MANAGER" = "yarn@berry" ]; then
    YARN_ENABLE_SCRIPTS=0 yarn
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

echo "Could not determine package manager at $(pwd)"
exit 1
