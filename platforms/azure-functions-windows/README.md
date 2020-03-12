# Azure Functions Windows

Tests Azure Functions in a Windows environment.

## Notes

Logs are not streamed to the CLI or CI for Azure Functions, so you'll have to log in to their portal and check the logs manually. You can also set up the Azure VS Code extension which is able to stream logs.

## How to run this locally

### Install the Azure Functions CLI

Copy and paste the following code. You can also check out [the official install docs](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

The `az` CLI is already pre-installed in GitHub Actions, while the `func` CLI is not.

#### Linux

```shell script
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
sudo apt-get update
sudo apt-cache policy azure-functions-core-tools
sudo apt-get install azure-functions-core-tools=2.7.1846-1
```

#### MacOS

```shell script
brew install azure-cli
brew tap azure/functions
brew install azure-functions-core-tools@2
```

### Login

If you have a root login and you're on a local system where a browser can be opened interactively, you can run this:

```shell script
az login
```

If not, you can use a service principal. The Prisma service principal details can be found in our internal 1Password. You can also create a service principal from the CI with `sh rbac.sh`.

```shell script
az login --service-principal -u "$AZURE_SP_NAME" -p "$AZURE_SP_PASSWORD" --tenant "$AZURE_SP_TENANT"
```

### Environment variables

The environment variable `AZURE_FUNCTIONS_LINUX_PG_URL` should point to a postgres database.
In CI, it uses our internal e2e test database using `platform-azure-functions-linux` as database URL.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
