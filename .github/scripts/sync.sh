#!/bin/bash

set -eu
shopt -s inherit_errexit || true

branch="$1"
default="dev"

mkdir -p ~/.ssh
echo "$SSH_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git remote add github "git@github.com:$GITHUB_REPOSITORY.git" || true

git fetch github "$default"
git reset --hard "github/$default"

version=$(bash .github/scripts/prisma-version.sh "$branch")
bash .github/scripts/upgrade-all.sh "$version"

echo "$version" > .github/prisma-version.txt

git status

if [ -z "$(git status -s)" ]; then
  echo "no changes"
  exit 0
fi

git commit -am "chore: sync, use $version"

# force-push to $branch
git push github "HEAD:refs/heads/$branch" --force
