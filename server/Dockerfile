FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn install

EXPOSE 4000

CMD ["yarn", "start"]
