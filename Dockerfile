FROM node:alpine AS developement

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .



