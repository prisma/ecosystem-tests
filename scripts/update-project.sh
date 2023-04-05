#! /bin/sh

IS_YARN_SUBPROJECT=$(node -e "console.log('$(pwd)'.includes('yarn') || '$(pwd)'.includes('redwood'))")
PRISMA_VERSION=$(node -e "console.log(require('./package.json')?.devDependencies?.['prisma'] || require('./package.json')?.dependencies?.['prisma']) || ''")
CLIENT_VERSION=$(node -e "console.log(require('./package.json')?.devDependencies?.['@prisma/client'] || require('./package.json')?.dependencies?.['@prisma/client']) | ''")

if [ -n "$PRISMA_VERSION" ]; then sed -i "s/$PRISMA_VERSION/$1/g" package.json; fi
if [ -n "$CLIENT_VERSION" ]; then sed -i "s/$CLIENT_VERSION/$1/g" package.json; fi

if [ -f "yarn.lock" ] || [ "$IS_YARN_SUBPROJECT" = "true" ]; then
    yarn
    exit 0
fi

if [ -f "package-lock.json" ]; then
    npm install
    exit 0
fi

if [ -f "pnpm-lock.yaml" ]; then
    pnpm install --lockfile-only
    exit 0
fi

echo "Could not determine package manager at $(pwd)"
exit 1
