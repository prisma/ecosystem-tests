yarn
docker-compose up -d
docker container exec -i $(docker-compose ps -q postgres) psql < data.sql
yarn prisma2 generate
yarn test