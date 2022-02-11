#!/bin/sh

set -eu

yarn vercel logs e2e-vercel-with-nextjs.vercel.app --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
