FROM node
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 5050
CMD [ "node", "server.js" ]