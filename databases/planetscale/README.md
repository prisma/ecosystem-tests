# Planetscale

Planetscale Database

## How to run this locally

You need to set several ENV variables:

```
PLANETSCALE_ORG=...
PLANETSCALE_SERVICE_TOKEN_NAME=...
PLANETSCALE_SERVICE_TOKEN=...
DATABASE_URL=mysql://root@127.0.0.1:3306/onboarding-demo
```

Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
yarn && yarn prisma generate
sh test.sh
```
