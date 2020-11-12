# To Reproduce

1. `yarn`
1. `yarn generate`

Error:

```
divyendusingh [typegraphql-prisma]$ yarn; yarn prisma generate
yarn install v1.22.4
warning ../../package.json: No license field
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.18s.
yarn run v1.22.4
warning ../../package.json: No license field
$ /Users/divyendusingh/Documents/prisma/e2e-tests/community-generators/typegraphql-prisma/node_modules/.bin/prisma generate
  tryLoadEnv Environment variables not found at null +0ms
  tryLoadEnv Environment variables not found at undefined +1ms
  tryLoadEnv No Environment variables loaded +0ms

Prisma schema loaded from schema.prisma
Error: Error:
TypeError: Cannot read property 'output' of undefined
    at Object.generate [as onGenerate] (/Users/divyendusingh/Documents/prisma/e2e-tests/community-generators/typegraphql-prisma/node_modules/typegraphql-prisma/lib/cli/prisma-generator.js:14:100)
    at async LineStream.<anonymous> (/Users/divyendusingh/Documents/prisma/e2e-tests/community-generators/typegraphql-prisma/node_modules/@prisma/generator-helper/dist/generatorHandler.js:13:32)


    at Generate.parse (/Users/divyendusingh/Documents/prisma/e2e-tests/community-generators/typegraphql-prisma/node_modules/@prisma/cli/build/index.js:66077:17)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async main (/Users/divyendusingh/Documents/prisma/e2e-tests/community-generators/typegraphql-prisma/node_modules/@prisma/cli/build/index.js:113835:18)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
