#!/bin/sh

set -eu

yarn
yarn deploy
echo https://`cat sandbox_id`.sse.codesandbox.io/
sh test.sh
