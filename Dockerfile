FROM node:14.17.5
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000 6379
CMD ["npm", "run", "dev"]