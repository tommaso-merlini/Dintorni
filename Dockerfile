FROM node:14.17.5-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

#COPY . .
COPY . ./src

RUN npm run build

EXPOSE 5000 6379
CMD ["npm", "run", "start"]