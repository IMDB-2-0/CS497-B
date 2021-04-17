
FROM node:12-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "node", "server.js" ]