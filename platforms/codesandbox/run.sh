#!/bin/sh

set -eux

pnpm install
pnpm run deploy
echo https://`cat sandbox_id`.sse.codesandbox.io/
