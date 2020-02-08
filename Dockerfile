FROM node:13.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm tsc

EXPOSE 8080

CMD ["node", "./dist/index.js"]