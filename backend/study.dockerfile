# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:study
EXPOSE 9000
CMD ["npm", "run", "start:study:prod"]
