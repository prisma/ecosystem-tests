FROM node:lts-alpine

COPY . /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install
RUN npx prisma generate
RUN npx prisma -v

CMD node server.js
EXPOSE 3000
