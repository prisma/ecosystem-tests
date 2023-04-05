#! /bin/sh

IS_YARN_SUBPROJECT=$(node -e "console.log('$(pwd)'.includes('yarn') || '$(pwd)'.includes('redwood'))")

if [ ! -f "yarn.lock" ] && [ "$IS_YARN_SUBPROJECT" = "true" ]; then
    exit 0
fi

if [ -f "yarn.lock" ]; then
    YARN_ENABLE_SCRIPTS=0 yarn
    exit 0
fi

if [ -f "package-lock.json" ]; then
    npm install --package-lock-only
    exit 0
fi

if [ -f "pnpm-lock.yaml" ]; then
    pnpm install --lockfile-only
    exit 0
fi

echo "Could not determine package manager at $(pwd)"
exit 1
