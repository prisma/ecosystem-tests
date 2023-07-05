# Cloudflare Workers - Module syntax

Deploys a Prisma Client using the Data Proxy on Cloudflare Workers.

This uses the "new" Module syntax (using `export default {}`)
https://developers.cloudflare.com/workers/learning/migrating-to-module-workers/

## How to run this

Set the crypto env var via `export AES_256_PASS=<value>`

```sh
source ./prepare.sh && ./run.sh && ./test.sh && ./finally.sh
```

## Notes

This fails with the following error by default (when instantiating the Prisma Client like `const prisma = new PrismaClient()`)

```
✘ [ERROR] Error on remote worker: ParseError: A request to the Cloudflare API (/accounts/cd5f1cdfd37dfbcd1c847c40a01c3f7a/workers/scripts/e2e-cloudflare-workers-module/edge-preview) failed.

      at throwFetchError
  (/Users/j42/Dev/ecosystem-tests/dataproxy/cloudflare-workers-module/node_modules/.pnpm/wrangler@3.0.1/node_modules/wrangler/wrangler-dist/cli.js:121071:17)
      at fetchResult
  (/Users/j42/Dev/ecosystem-tests/dataproxy/cloudflare-workers-module/node_modules/.pnpm/wrangler@3.0.1/node_modules/wrangler/wrangler-dist/cli.js:121038:5)
      at processTicksAndRejections (node:internal/process/task_queues:96:5)
      at async createPreviewToken
  (/Users/j42/Dev/ecosystem-tests/dataproxy/cloudflare-workers-module/node_modules/.pnpm/wrangler@3.0.1/node_modules/wrangler/wrangler-dist/cli.js:128473:29)
      at async createWorkerPreview
  (/Users/j42/Dev/ecosystem-tests/dataproxy/cloudflare-workers-module/node_modules/.pnpm/wrangler@3.0.1/node_modules/wrangler/wrangler-dist/cli.js:128494:17)
      at async start
  (/Users/j42/Dev/ecosystem-tests/dataproxy/cloudflare-workers-module/node_modules/.pnpm/wrangler@3.0.1/node_modules/wrangler/wrangler-dist/cli.js:147836:34)
  {
    text: 'A request to the Cloudflare API
  (/accounts/cd5f1cdfd37dfbcd1c847c40a01c3f7a/workers/scripts/e2e-cloudflare-workers-module/edge-preview)
  failed.',
    notes: [
      {
        text: 'Uncaught Error: InvalidDatasourceError: Datasource "db" references an environment
  variable "CLOUDFLARE_DATA_PROXY_URL" that is not set\n' +
          '  at index.js:5610:19 in resolveDatasourceURL\n' +
          '  at index.js:5579:94 in extractHostAndApiKey\n' +
          '  at index.js:5477:27 in zr\n' +
          '  at index.js:8867:20 in getEngine\n' +
          '  at index.js:8848:1291 in t\n' +
          '  at index.js:9199:14\n' +
          ' [code: 10021]'
      }
    ],
    location: undefined,
    kind: 'error',
    code: 10021
  }
```

How to fix it? By passing the datasource connection string manually, see index.ts for full example.

```ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.CLOUDFLARE_DATA_PROXY_URL,
    },
  },
})
```
