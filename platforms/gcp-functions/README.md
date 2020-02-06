# GCP functions

GCP allows deploying just the project and fetches the modules for the user. They even provide a custom hook which would allow the user to run `prisma2 generate`, but Google re-generates the node_modules folder after the custom hook as well, so we can't make use of it. Instead, you need to install node_modules locally, and then un-ignore it using the .gcloudignore file, so your local node_modules will be uploaded.
