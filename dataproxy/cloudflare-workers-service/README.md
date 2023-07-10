# Cloudflare Workers - Service Worker syntax

Deploys a Prisma Client using the Data Proxy on Cloudflare Workers.

This uses the "old" Service Worker syntax (using `addEventListener()`)
https://developers.cloudflare.com/workers/learning/service-worker/

## How to run this

Set the necessary env vars first.

```sh
source ./prepare.sh && ./run.sh && ./test.sh && ./finally.sh
```
