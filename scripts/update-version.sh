#! /bin/sh

CLI_PKG_VERSION=$(node -e "const pkg = require('./package.json'); console.log(pkg?.devDependencies?.['prisma'] || pkg?.dependencies?.['prisma'] || pkg?.resolutions?.['prisma'] || '')")
CLIENT_PKG_VERSION=$(node -e "const pkg = require('./package.json'); console.log(pkg?.devDependencies?.['@prisma/client'] || pkg?.dependencies?.['@prisma/client'] || pkg?.resolutions?.['@prisma/client'] || '')")
INSTRUMENTATION_PKG_VERSION=$(node -e "const pkg = require('./package.json'); console.log(pkg?.devDependencies?.['@prisma/instrumentation'] || pkg?.dependencies?.['@prisma/instrumentation'] || pkg?.resolutions?.['@prisma/instrumentation'] || '')")
CURRENT_DIR=$(pwd)

if [ -n "$CLI_PKG_VERSION" ]; then sed -i "s/$CLI_PKG_VERSION/$1/g" package.json; fi
if [ -n "$CLIENT_PKG_VERSION" ]; then sed -i "s/$CLIENT_PKG_VERSION/$1/g" package.json; fi
if [ -n "$INSTRUMENTATION_PKG_VERSION" ]; then sed -i "s/$INSTRUMENTATION_PKG_VERSION/$1/g" package.json; fi
