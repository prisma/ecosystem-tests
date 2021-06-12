#!/bin/sh

set -eux

sh sync-to-remote.sh

if [ -z ${PRISMA_FORCE_NAPI+x} ]; then
  echo "N-API: Disabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests;
      
      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/administrator/.cargo/bin 
      
      yarn;
      yarn prisma generate;
  "
else
  echo "N-API: Enabled"
  ssh -i ./server-key.pem administrator@207.254.29.83 -tt "
      cd /Users/administrator/e2e-tests;
      export PRISMA_FORCE_NAPI=\"true\";

      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/administrator/.cargo/bin 

      yarn;
      yarn prisma generate;
  "
fi
