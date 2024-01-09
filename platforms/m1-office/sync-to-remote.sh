#!/bin/sh

set -eux

echo "Sync: Removing local node_modules"
rm -rf ./code/node_modules


sshpass -p$MACHINE_SECRET ssh -tt github@$MACHINE_IP "
  echo 'Hello from: ' && uname;
  echo 'on:' && hostname && echo 'Node.js:' && node -v

  if which node > /dev/null
  then
      echo 'Node.js is already installed';
      nvm -v;
      nvm ls;
      node -v;
      npm -v;
  else
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash;
      nvm install 20;
      nvm alias default 20;
      nvm ls;
      curl -fsSL https://get.pnpm.io/install.sh | sh -
      source /Users/github/.zshrc
  fi

  echo "Sync: Create remote folder"
  mkdir -p /Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE
"

echo "Sync: Copying new code to unique folder"
sshpass -p$MACHINE_SECRET scp -rp ./code/* github@$MACHINE_IP:/Users/github/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE/

echo "sync-to-remote done"
