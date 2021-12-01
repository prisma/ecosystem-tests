# AWS Lambda

AWS Lambda. Zips the file and uploads it using the `--zip-file` aws cli flag.

## Friction points

- some modules are currently removed from the zip

## How to run this locally

### Install AWS CLI

We use the AWS CLI v1.

Follow [the official docs](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html).

The AWS v1 CLI is already pre-installed in GitHub Actions.

### Authenticate

- `AWS_DEFAULT_REGION`: The AWS region name. In Prisma's case, this is `eu-central-1`.
- `AWS_ROLE`: The aws role, e.g. `arn:aws:iam::<id>:role/service-role/<role-id>`.
- `AWS_SECRET_ACCESS_KEY`: The AWS secret.
- `AWS_ACCESS_KEY_ID`: The AWS access key id.

Check 1Password for the values for our e2e account.

### Environment variables

The environment variable `DATABASE_URL` should point to a postgres database.

In CI, it uses our internal e2e test database using `platform-lambda` as database URL.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Prepare

To create a function on your own account, run `sh create.sh` first.

### Run rests

```shell script
sh run.sh
```
