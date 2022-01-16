FROM node:14.17.5-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
RUN npm install -g typescript
RUN npm install -g ts-node

COPY . .

RUN npm run build

EXPOSE 5000 6379
CMD ["npm", "run", "start"]