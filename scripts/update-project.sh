#! /bin/sh

HAS_PRISMA=$(node -e "console.log('$(cat package.json)'.includes('\"prisma\": '))")
HAS_CLIENT=$(node -e "console.log(fs.readFileSync('package.json').includes('\"@prisma\\/client\": '))")

if [ -f "yarn.lock" ]; then
    if [ "$HAS_PRISMA" = "true" ]; then yarn add prisma@$1 --dev --ignore-scripts; fi
    if [ "$HAS_CLIENT" = "true" ]; then yarn add @prisma/client@$1 --ignore-scripts; fi
    exit 0
fi

if [ -f "package-lock.json" ]; then
    if [ "$HAS_PRISMA" = "true" ]; then npm install -D prisma@$1 --ignore-scripts --save-exact; fi
    if [ "$HAS_CLIENT" = "true" ]; then npm install @prisma/client@$1 --ignore-scripts --save-exact; fi
    exit 0
fi

if [ -f "pnpm-lock.yaml" ]; then
    if [ "$HAS_PRISMA" = "true" ]; then pnpm install -D prisma@$1 --lockfile-only; fi
    if [ "$HAS_CLIENT" = "true" ]; then pnpm install @prisma/client@$1 --lockfile-only; fi
    exit 0
fi

echo "Could not determine package manager at $(pwd)"
exit 1
