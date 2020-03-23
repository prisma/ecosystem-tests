#!/bin/sh

set -eu

export CI=true

cd .github/slack/
yarn install
cd ../..

root=$(pwd)

dir=$1
project=$2
set +u
matrix=$3
set -u

echo "running $dir/$project"

cd "$dir/$project"

if [ -f "prepare.sh" ]; then
	echo "prepare script found, executing $dir/$project/prepare.sh"
	sh prepare.sh
fi

set +e
sh run.sh
code=$?
set -e

echo "$dir/$project done"

cd "$root"

if [ "$GITHUB_REF" = "refs/heads/master" ] || [ "$GITHUB_REF" = "refs/heads/alpha" ]; then
	(cd .github/slack/ && yarn install --silent)

	run_url="$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/prisma/prisma2-e2e-tests/actions/runs/$GITHUB_RUN_ID/jobs | jq -j ".jobs[$((GITHUB_RUN_NUMBER - 1))].html_url")"
	branch="${GITHUB_REF##*/}"
	sha="$(git rev-parse HEAD | cut -c -7)"
	short_sha="$(echo "$sha" | cut -c -7)"
	link="\`<https://github.com/prisma/prisma2-e2e-tests/commit/$sha|$branch@$short_sha>\`"

	export webhook="$SLACK_WEBHOOK_URL"
	version="$(cat .github/prisma-version.txt)"
	sha="$(git rev-parse HEAD | cut -c -7)"

	emoji=":x:"
	if [ $code -eq 0 ]; then
		emoji=":white_check_mark:"
	fi

	echo "notifying slack channel"
	node .github/slack/notify.js "$link: ${emoji} <$run_url|$project $matrix ran using prisma@$version>"

	if [ $code -ne 0 ]; then
		export webhook="$SLACK_WEBHOOK_URL_FAILING"
		echo "notifying failing slack channel"
		node .github/slack/notify.js "$link: :x: <$run_url|$project $matrix failed using prisma@$version>"
	fi
fi

echo "exitting with code $code"
exit $code
