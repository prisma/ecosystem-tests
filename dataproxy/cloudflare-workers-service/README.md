# Cloudflare Workers - Service Worker syntax

Deploys a Prisma Client using the Data Proxy on Cloudflare Workers.

This uses the "old" Service Worker syntax (using `addEventListener()`)
https://developers.cloudflare.com/workers/learning/service-worker/

## How to run this

Set the crypto env var via `export AES_256_PASS=<value>`

```sh
source ./prepare.sh && ./run.sh && ./test.sh && ./finally.sh
```
