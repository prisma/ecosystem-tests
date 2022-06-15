# Vercel API

Prisma and Vercel's integration using the API folder configuration. This works without any configuration.

## How to run this locally

### Vercel authentication

A vercel token needs to be set with the environment variable `VERCEL_TOKEN`.

Alternatively, you can login using `vercel login`.

### Environment variables

The env var `VERCEL_DATA_PROXY_URL` should point to a postgres database via Data Proxy.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.
