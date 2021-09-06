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

      yarn;
      yarn prisma generate;
      yarn prisma -v;
  "
fi
