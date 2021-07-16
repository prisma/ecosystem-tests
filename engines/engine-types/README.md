# Node-API Preview Feature Test

This tests that the node-api library is used in the generated client and that it works

- Builds the required schema
- Runs `yarn install`
- Snapshots files in `./node_modules/@prisma/engines` (CLI Engines) and `./node_modules/prisma` (CLI)
- Runs `prisma generate`
- Snapshots `./node_modules/.prisma/client` (Generated client with engine)
- Runs some basic tests using the generated client
- Snapshots `prisma -v`

### Run tests

```shell script
sh run.sh
sh test.sh
```

### Update Snapshots

```sh
yarn test -u
```
