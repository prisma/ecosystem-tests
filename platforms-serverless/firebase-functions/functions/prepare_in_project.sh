#!/bin/sh

set -eux

func="$1"

npm install
npx tsc
npx prisma generate

# use a new function name in index.js since Google reads function names from js files
# however, we need to use different functions for each deploy to prevent clashes
sed -i'.bak' "s/__FIREBASE_FUNCTION_NAME__/$func/g" index.js
