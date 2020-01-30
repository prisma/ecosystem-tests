#!/bin/sh

set -eu

yarn deploy
sleep 60
echo https://`cat sandbox_id`.sse.codesandbox.io/
sh test.sh