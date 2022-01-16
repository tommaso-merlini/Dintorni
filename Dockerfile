FROM node:14.17.5-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --verbose

COPY . .

RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 5000 6379
CMD node src/Servers/server.js