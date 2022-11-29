FROM node:19-alpine
WORKDIR /rest-api
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./server.js ./server.js
COPY ./song ./song
EXPOSE 3001
CMD ["npm", "run", "start"]