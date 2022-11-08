#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

which openssl

openssl version

if [ `uname` = "Linux" ] ;
then
    # Linux
    # Needed for GitHub Linux runner image
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
fi

brew install nvm
source $(brew --prefix nvm)/nvm.sh

nvm install --lts

brew install openssl@1.1

openssl version

yarn install

yarn prisma db pull --print

yarn prisma generate
