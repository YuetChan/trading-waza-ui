FROM node:15.7.0-alpine3.11 AS build
WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY public/ public
COPY src/ src
RUN npm run build

FROM httpd:alpine
WORKDIR /var/www/html
COPY --from=build /build/build/ .