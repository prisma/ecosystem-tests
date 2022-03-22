#!/bin/sh

set -eux

yarn install
yarn prisma generate

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms netlify-cli build'


# create empty `functions-build` folder
rm -rf functions-build
mkdir -p functions-build

# copy `prisma` folder to existing `functions` folder
cp -R ./prisma ./functions/prisma

# zip up everything in `functions` and copy to `functions-build`
cd functions/
zip -r index.zip *
mv index.zip ../functions-build/index.zip
cd ..

# deploy content of `functions-build` to Netlify
yarn netlify deploy --dir=. --prod --functions=functions-build
# TODO Use individual deployment URL and store

# TODO Why is this done?
rm -rf functions/prisma

sleep 10
