#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

openssl version

# Needed for GitHub Linux runner image
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install nvm

export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
nvm install --lts

brew install openssl@1.1

openssl version

yarn install
yarn prisma generate
