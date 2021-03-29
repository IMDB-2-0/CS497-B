FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "node", "server.js" ]
