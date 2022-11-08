#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

openssl version

if [ `uname` = "Linux" ] ;
then
    # Linux
    # Needed for GitHub Linux runner image
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    
    brew install nvm

    export NVM_DIR="$HOME/.nvm"
    [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
fi

nvm install --lts

brew install openssl@1.1

openssl version

yarn install
yarn prisma generate
