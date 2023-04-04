#!/bin/sh

set -eux

npm install
npm run deploy
echo https://`cat sandbox_id`.sse.codesandbox.io/
