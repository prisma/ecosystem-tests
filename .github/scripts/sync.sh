#!/bin/sh

set -eu

branch="$1"

mkdir -p ~/.ssh
echo "$SSH_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git remote add github "git@github.com:$GITHUB_REPOSITORY.git" || true

# checkout the default branch 'dev' and then run upgrade-all.sh
git fetch "github" "dev"
git checkout "github/dev"
git reset --hard "github/dev"

version=$(sh .github/scripts/prisma-version.sh "$branch")
sh .github/scripts/upgrade-all.sh "$version"

echo "$version" > .github/prisma-version.txt

git commit -am "chore: sync, use $(sh .github/scripts/prisma-version.sh "$branch")"

# fail silently if the unlikely event happens that this change already has been pushed either manually
# or by an overlapping upgrade action
git pull github "${GITHUB_REF}" --rebase || true

# force-push to $branch
git push github "HEAD:refs/heads/$branch" --force
