#!/bin/sh

set -eu

yarn vercel logs vercel-api-mu.now.sh --token=$VERCEL_TOKEN --scope=prisma
