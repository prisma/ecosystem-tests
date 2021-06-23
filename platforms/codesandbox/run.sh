#!/bin/sh

set -eux

yarn
yarn deploy
echo https://`cat sandbox_id`.sse.codesandbox.io/
