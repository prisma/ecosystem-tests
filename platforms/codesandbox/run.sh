#!/bin/sh

set -eux

pnpm install
pnpm deploy
echo https://`cat sandbox_id`.sse.codesandbox.io/
