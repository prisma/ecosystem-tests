#!/bin/sh

set -eu

if [ $PRISMA_CLIENT_ENGINE_TYPE == "binary" ]; then
  echo "Binary"
  yarn vercel logs e2e-vercel-node-builder-binary.prisma.vercel.app --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
else
  echo "Library (Default)"
  yarn vercel logs e2e-vercel-node-builder.prisma.vercel.app --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
fi