# GCP functions

GCP allows deploying just the project and fetches the modules for the user. To generate the Prisma client, we use the npm `postinstall` hook. Using the `gcp-build` hook does not work, since Google regenerates `node_modules` after that hook is executed.

## How to run this locally

### Install the gcloud CLI

Follow the [official instructions](https://cloud.google.com/sdk/docs/downloads-interactive).

The AWS v1 CLI is already pre-installed in GitHub Actions.

### Environment variables

The environment variable `DATABASE_URL` should point to a postgres database.

In CI, it uses our internal e2e test database using `platform-gcp-functions` as database URL.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

Additional required environment variables:
- `GCP_FUNCTIONS_PROJECT`: The GCP project. In our case, this is `prisma-e2e-tests-265911`.
- `GCP_FUNCTIONS_ACCOUNT`: The username of the service account, check 1Password for our internal username. Should be in the format `xxx@<project-id>.iam.gserviceaccount.com`.
- `GCP_FUNCTIONS_SECRET`: The value of the json file service account with the appropriate permissions.

### Run tests

```shell script
sh run.sh
```
