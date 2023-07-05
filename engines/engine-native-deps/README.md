# engine-native-deps

This test checks the native dependencies of Prisma Engines to ensure
we don't add any unexpected new dependencies and to keep the [System
Requirements](https://www.prisma.io/docs/reference/system-requirements)
documentation page up to date.

## Running the test

```sh
pnpm install
pnpm test
```

## Updating the snapshots

```sh
pnpm update-snapshots
```
