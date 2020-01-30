#!/bin/sh

set -eu

yarn
yarn deploy
sleep 120
echo https://`cat sandbox_id`.sse.codesandbox.io/
sh test.sh