# * Dockerfile only for building purposes and not serving app
# * Served by outer service

FROM node:14 as build-deps

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm i --silent
RUN npm i -g serve
COPY . ./
RUN npm run build

# Serve command
# CMD serve -s build