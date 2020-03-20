# Google Firebase functions

Closely related to Google Cloud functions. The CLI is different, but apart from that the deployment works the same. Firebase functions use the `postinstall` hook to generate the prisma client.

## Caveats

It seems it's currently not possible to set environment variables directly to a function. Instead, Google uses a config store, but Prisma expects an environment variable, so we workaround that by reading the config store and setting the environment variable in the same process before initialising Prisma.
