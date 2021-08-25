# Google Firebase functions

Closely related to Google Cloud functions. The CLI is different, but apart from that the deployment works the same. Firebase functions use the `postinstall` hook to generate the prisma client.

## Caveats

It seems it's currently not possible to set environment variables directly to a function (see https://firebase.google.com/docs/functions/config-env). Instead, Google uses a config store, but Prisma expects an environment variable, so we workaround that by reading the config store and setting the environment variable in the same process before initialising Prisma.

## How to run this locally

### Install the Firebase CLI

Most simple install method:

```shell script
npm install -g firebase-tools
```

For more install methods, follow the [official install docs](https://firebase.google.com/docs/cli).

### Firebase authentication

A [firebase token](https://firebase.google.com/docs/cli#cli-ci-systems) needs to be set with the environment variable `FIREBASE_TOKEN`.

If you use an interactive login using `firebase login`, you need to temporarily edit `run.sh` and remove the `--token` parameter so the firebase will use your credentials saved by `firebase login`.

### Environment variables

The environment variable `FIREBASE_FUNCTIONS_PG_URL` should point to a postgres database.
In CI, it uses our internal e2e test database using `platform-firebase-functions` as database URL.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
