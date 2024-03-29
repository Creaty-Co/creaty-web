FROM node:14 as builder
WORKDIR /web
COPY package.json package-lock.json ./
RUN npm i --silent
RUN npm i -g serve
COPY . .
RUN npm run build

FROM ubuntu:23.04 as web
WORKDIR /web
COPY --from=builder /web .
RUN cd .. && mv web/build build && rm -r web && mv build web
RUN gzip -rkv9 .
