echo $(jq ".devDependencies[\"@prisma/cli\"]" ./package.json | tr -d '"')
