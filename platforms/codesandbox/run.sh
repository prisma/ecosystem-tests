#!/bin/sh

set -eux

yarn install
yarn run deploy
echo https://`cat sandbox_id`.sse.codesandbox.io/
