FROM node:15.7.0-alpine3.11 AS build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --production
RUN npm install -g serve

EXPOSE 3000

CMD serve -s build