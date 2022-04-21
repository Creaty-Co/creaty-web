# * Dockerfile only for building purposes and not serving app
# * Served by outer service

FROM node:14.18.1

WORKDIR /frontend

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i --silent

# Copy source files and folders
COPY ./public ./public
COPY ./src ./src
COPY ./.eslintrc ./.eslintrc
COPY ./tsconfig.json ./tsconfig.json

# Copy .env files
COPY ./.env ./.env

# Make a build and change mode to 777
RUN npm run build