FROM node:lts-alpine

COPY . /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install
RUN npx prisma -v
RUN npx prisma generate

CMD node server.js
EXPOSE 3000
