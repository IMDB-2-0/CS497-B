FROM node:12-alpine

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start" ]

