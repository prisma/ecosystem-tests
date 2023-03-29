#!/bin/sh

set -eux

yarn
pnpm deploy
echo https://`cat sandbox_id`.sse.codesandbox.io/
