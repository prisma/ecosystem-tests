echo $(jq ".devDependencies[\"prisma\"]" ./package.json | tr -d '"')
