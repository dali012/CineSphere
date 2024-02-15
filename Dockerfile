FROM node:20.11.0-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node pnpm

COPY package*.json /tmp/app/
RUN cd /tmp/app && pnpm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app

WORKDIR /usr/src/app
RUN npx prisma generate
RUN pnpm run build

CMD pnpm start:prod