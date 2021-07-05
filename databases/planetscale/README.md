# PlanetScale

PlanetScale Database

## How to run this locally

You need to set several ENV variables:

```
PLANETSCALE_ORG=...
PLANETSCALE_SERVICE_TOKEN_NAME=...
PLANETSCALE_SERVICE_TOKEN=...
PSCALE_NO_UPDATE_NOTIFIER=true
```

How to get these: https://docs.planetscale.com/tutorial/connect-any-application (and configure them for access to the database)

Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
yarn && yarn prisma generate
sh test.sh
```
