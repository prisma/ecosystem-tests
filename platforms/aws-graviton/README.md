## Testing on an AWS Graviton instance

### Infra

Name: aws-graviton
us-east-1
AWS Linux AMI 64-bit ARM
t4g.small
30GB of disk

Note: using an A1 Instance Type (a1.medium) results in a kernel panic.

### One time setup

```sh
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# Install Node 16
nvm install v16
# Install pnpm
npm install -g pnpm
```
