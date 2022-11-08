#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

openssl version

if [[ "$OSTYPE" == "darwin"* ]]; then
        # Nothing
elif [[ "$OSTYPE" == "win32" ]]; then
        # Nothing
else
        # Linux
        # Needed for GitHub Linux runner image
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /home/runner/.bash_profile
        echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/runner/.bash_profile
        eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
fi
    
brew install nvm

export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
nvm install --lts

brew install openssl@1.1

openssl version

yarn install
yarn prisma generate
