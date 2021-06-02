FROM node:14.3-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn
COPY src /usr/app/src
COPY babel.config.js /usr/app
COPY .nvmrc /usr/app
COPY .sequelizerc /usr/app
COPY .env /usr/app
RUN yarn build