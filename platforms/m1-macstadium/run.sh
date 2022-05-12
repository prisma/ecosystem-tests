#!/bin/sh

set -eux

sh sync-to-remote.sh

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "N-API: Disabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID;
      export PRISMA_CLIENT_ENGINE_TYPE=\"binary\";

      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/administrator/.cargo/bin

      # Load NVM, normally loaded in `./.zshrc` but the `export PATH` removes it, so we load it again here
      # From https://github.com/nvm-sh/nvm#installing-and-updating
      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

      yarn;
      yarn prisma generate;
      yarn prisma -v;
  "
else
  echo "N-API: Enabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID;
      export PRISMA_CLIENT_ENGINE_TYPE=\"library\";

      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/administrator/.cargo/bin

      # Load NVM, normally loaded in `./.zshrc` but the `export PATH` removes it, so we load it again here
      # From https://github.com/nvm-sh/nvm#installing-and-updating
      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
      
      yarn;
      yarn prisma generate;
      yarn prisma -v;
  "
fi
