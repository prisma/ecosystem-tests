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

      echo $PATH;
      which node;
      which nvm;
      which pnpm;

      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/Users/github/.nvm/versions/node/v20.10.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/github/.cargo/bin

      echo $PATH;
      which node;
      which nvm;
      which pnpm;

      if which node > /dev/null
      then
          echo 'Node.js is already installed';
          nvm -v;
          nvm ls;
          node -v;
          npm -v;
      else
          echo 'Node.js will be isntalled...';
          curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash;
          nvm install 20;
          nvm alias default 20;
          nvm ls;
      fi

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

      echo $PATH;
      which node;
      which nvm;
      which pnpm;

      # to get around https://serverfault.com/questions/351731/why-does-the-path-of-an-ssh-remote-command-differ-from-that-of-an-interactive-s
      export PATH=/Users/github/.nvm/versions/node/v20.10.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/github/.cargo/bin

      echo $PATH;
      which node;
      which nvm;
      which pnpm;

      if which node > /dev/null
      then
          echo 'Node.js is already installed';
          nvm -v;
          nvm ls;
          node -v;
          npm -v;
      else
          echo 'Node.js will be isntalled...';
          curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash;
          nvm install 20;
          nvm alias default 20;
          nvm ls;
      fi
  "
fi
