#!/bin/sh

set -eux

npm install
npm run deploy
echo "https://$(cat sandbox_id)-3000.csb.app"
