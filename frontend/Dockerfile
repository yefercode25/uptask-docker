FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY . .

RUN npm install
RUN npm run build

EXPOSE 7676

CMD ["npm", "start"]