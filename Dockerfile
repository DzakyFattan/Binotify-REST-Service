FROM node:19-alpine
WORKDIR /rest-api
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3001
CMD ["npm", "run", "start"]