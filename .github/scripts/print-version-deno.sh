#!/usr/bin/env bash

set -eu
shopt -s inherit_errexit || true

denoJsonPath="$1"

echo "-------------------------"
echo ""

echo "deno: $(deno -v)"

echo "prisma-version.txt: $(cat .github/prisma-version.txt)"
echo "prisma (deno.json): $(jq -r '.imports["prisma"] | sub("^npm:prisma@"; "")' < $denoJsonPath)"
echo "@prisma/client (deno.json): $(jq -r '.imports["@prisma/client"] | sub("^npm:@prisma/client@"; "")' < $denoJsonPath)"

echo ""
echo "-------------------------"
