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

#### Service Principal 

Without login for Azure, you can use a service principal.

(It was initially created with `sh rbac.sh`.)

```shell script
az login --service-principal -u "$AZURE_SP_NAME" -p "$AZURE_SP_PASSWORD" --tenant "$AZURE_SP_TENANT"
```

AZURE_SP_NAME = the name of the service principal  
AZURE_SP_PASSWORD = the secret
AZURE_SP_TENANT = An Azure internal ID, visible in Azure Portal

Note: Client secret lifetime is limited (docs say: two years or less.)

##### Maintining the Service Principal

You can create new secrets for the service principal in Azure Portal under "App regristrations": https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/e6204f1a-d757-465f-9ddd-8d50a05c09c2/isMSAApp~/false

### Prepare

To create a function on your own account, run `sh create.sh` first.
