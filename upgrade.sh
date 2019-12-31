#!/bin/sh

set -eu

no_negatives () {
	echo "$(( $1 < 0 ? 0 : $1 ))"
}

# since GH actions are limited to 5 minute cron jobs, just run this continuously for 5 minutes
# check each 30 seconds, so 10 times per 5 minutes
j=0
while [ $j -le 10 ]; do
	# increment to prevent forgetting incrementing, and also prevent overlapping with the next 5-minute job
	j=$(( j + 1 ))
	echo "run $j"
	echo "checking info..."

	start=$(date "+%s")

	channel="alpha"
	v=$(yarn info prisma2@$channel --json | jq '.data["dist-tags"].alpha' | tr -d '"')

	packages=$(find . -not -path "*/node_modules/*" -type f -name "package.json")

	dir=$(pwd)

	echo "$packages" | tr ' ' '\n' | while read -r item; do
		echo "checking $item"
		cd "$(dirname "$item")/"
		yarn add "prisma2@$v" --dev
		yarn add "@prisma/photon@$v"
		cd "$dir"
	done

	if [ -z "$(git status -s)" ]; then
		echo "no changes"
		end=$(date "+%s")
		diff=$(echo "$end - $start" | bc)
		remaining=$((30 - 1 - diff))
		echo "took $diff seconds, sleeping for $remaining seconds"
		sleep "$(no_negatives $remaining)"

		continue
	fi

	echo "changes, upgrading..."

	mkdir -p ~/.ssh
	echo "$SSH_KEY" > ~/.ssh/id_rsa
	chmod 600 ~/.ssh/id_rsa
	ssh-keyscan github.com >> ~/.ssh/known_hosts

	git config --global user.email "prismabots@gmail.com"
	git config --global user.name "Prismo"

	git remote add github "git@github.com:$GITHUB_REPOSITORY.git"

	git commit -am "chore(packages): bump prisma2 to $v"

	git push github HEAD:"${GITHUB_REF}"

	echo "pushed commit"

	end=$(date "+%s")
	diff=$(echo "$end - $start" | bc)
	remaining=$((30 - 1 - diff))
	echo "took $diff seconds, sleeping for $remaining seconds"
	sleep "$(no_negatives $remaining)"
done

echo "done"
