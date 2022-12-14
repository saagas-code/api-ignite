FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 8819

CMD ["npm", "run", "dev"]