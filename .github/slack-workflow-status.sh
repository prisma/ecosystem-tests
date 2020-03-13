#!/bin/sh

set -eu

(cd .github/slack/ && yarn install --silent)

emoji="$1"

export webhook="$SLACK_WEBHOOK_URL_WORKFLOWS"
version="$(cat .github/prisma-version.txt)"
sha="$(git rev-parse HEAD)"
short_sha="$(echo "$sha" | cut -c -7)"
message="$(git log -1 --pretty=%B)"

link="\`<https://github.com/prisma/prisma2-e2e-tests/commit/$sha|$short_sha>\`"

node .github/slack/notify.js "$link prisma@$version $emoji $message"
