FROM node AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

FROM node AS production

WORKDIR /usr/src/app

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]





