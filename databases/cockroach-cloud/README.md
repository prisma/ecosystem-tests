# Cockroach Cloud

## How to run this locally

The environment variable `DATABASE_URL_COACKROACH_CLOUD` should point to a Cockroach Cloud database. 

### Run tests

```shell script
yarn && yarn prisma generate
sh test.sh
```
