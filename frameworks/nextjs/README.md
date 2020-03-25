# NextJS

NextJS with SSR and `unstable_getStaticProps`.

## How to run this locally

### Environment variables

The environment variable `FRAMEWORK_NEXTJS_PG_URL` should point to a postgres database.
In CI, it uses our internal e2e test database using `framework-nextjs` as database URL.
Please check our internal 1Password for a ready-to-use environment variable or 
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
