# Azure Functions Windows

Tests Azure Functions in a Windows environment.

## Notes

Logs are not streamed to the CLI or CI for Azure Functions, so you'll have to log in to their portal and check the logs manually. You can also set up the Azure VS Code extension which is able to stream logs.

## How to run this locally

### Install the Azure CLI

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

(The Azure Functions Core Tools are installed via Npm)

### Login

If you have a root login and you're on a local system where a browser can be opened interactively, you can run this:

```shell script
az login
```

If not, you can use a service principal. The Prisma service principal details can be found in our internal 1Password. You can also create a service principal from the CI with `sh rbac.sh`.

Note: Client secret lifetime is limited (docs say: two years or less.)

```shell script
az login --service-principal -u "$AZURE_SP_NAME" -p "$AZURE_SP_PASSWORD" --tenant "$AZURE_SP_TENANT"
```

### Prepare

To create a function on your own account, run `sh create.sh` first.
