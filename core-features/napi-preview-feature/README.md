# N-API Preview Feature Test

This tests that the n-api library is used in the generated client and that it works

- Builds the required schema
- Runs Yarn Install
- Snapshots files in ./node_modules/@prisma/engines and ./node_modules/prisma
- Runs Generate
- Snapshots ./node_modules/.prisma/client
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
