# Netlify CI build

Prisma and Netlify [beta build](https://build-beta.netlify.com/) integration.

## Friction points

- https://github.com/netlify/build/issues/730
- Not zero-config, binary target configuration needed

  ```
  generator prisma_client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
  }
  ```

- Sometimes, the Netlify build fails to work with a "missing binary". While I don't know the cause of this yet, clearing the build cache usually fixes it.

## How to run this locally

### Netlify authentication

A netlify token needs to be set with the environment variable `NETLIFY_AUTH_TOKEN`.

Alternatively, you can login using `netlify login`.

### Environment variables

The environment variable `NETLIFY_PG_URL` should point to a postgres database.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```

Alternatively, you can also try deploying locally, but note that you might that the CI behaviour is not tested which might be relevant:

```shell script
netlify dev
```
