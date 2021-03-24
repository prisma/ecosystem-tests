#!/bin/bash

set -e

rm -rf functions-build
mkdir -p functions-build

cp -R ./prisma ./functions/prisma

#cd functions/
#zip -r index.zip *

rm -rf temp
pwd
npx cpr functions temp/functions --overwrite
pwd
rm -rf index.zip
npx --package=@janpio/cross-zip-cli@0.0.3 cross-zip temp ../index.zip
pwd 

du -b ./index.zip


mv index.zip functions-build/index.zip

#cd ..
yarn netlify deploy --dir=. --prod --functions=functions-build

rm -rf functions/prisma
