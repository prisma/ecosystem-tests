#!/bin/sh

set -eu

yarn vercel logs e2e-vercel-with-nextjs.vercel.app --token=$VERCEL_TOKEN --scope=prisma
