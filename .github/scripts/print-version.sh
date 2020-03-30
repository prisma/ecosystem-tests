#!/bin/sh

set -eu

packageJSONDir="$1"

echo "-------------------------"
echo ""

echo "node: $(node -v)"
echo "npm: $(npm -v)"

echo "prisma-version.txt: $(cat .github/prisma-version.txt)"
echo "@prisma/cli: $(jq .devDependencies[\"@prisma/cli\"] < $packageJSONDir)"
echo "@prisma/client: $(jq .dependencies[\"@prisma/client\"] < $packageJSONDir)"

echo ""
echo "-------------------------"
