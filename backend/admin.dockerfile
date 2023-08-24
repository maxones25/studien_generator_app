# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:admin
EXPOSE 8000
CMD ["npm", "run", "start:admin:prod"]
