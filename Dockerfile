FROM node:18.14-alpine

WORKDIR /app

COPY /*.json ./

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start:dev"]