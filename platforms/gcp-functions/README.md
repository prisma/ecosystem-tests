# GCP functions

GCP allows deploying just the project and fetches the modules for the user. To generate the Prisma client, we use the npm `postinstall` hook. Using the `gcp-build` hook does not work, since Google regenerates `node_modules` after that hook is executed.
