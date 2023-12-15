#!/bin/sh

set -eux

export MACHINE_IP=192.168.1.192

sh sync-to-remote.sh

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "N-API: Disabled"
  sshpass -p$MACHINE_SECRET ssh github@$MACHINE_IP -tt "
      cd /Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
      export PRISMA_CLIENT_ENGINE_TYPE=\"binary\";
      export CI=\"true\";

      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/Users/github/.nvm/versions/node/v16.20.1/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/github/.cargo/bin

      npm i -g pnpm@8;
      pnpm install;
      pnpm prisma generate;
      pnpm prisma -v;
  "
else
  echo "N-API: Enabled"
  sshpass -p$MACHINE_SECRET ssh github@$MACHINE_IP -tt "
      cd /Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE;
      export PRISMA_CLIENT_ENGINE_TYPE=\"library\";
      export CI=\"true\";

      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/Users/github/.nvm/versions/node/v16.20.1/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/github/.cargo/bin

      npm i -g pnpm@8;
      pnpm install;
      pnpm prisma generate;
      pnpm prisma -v;
  "
fi
