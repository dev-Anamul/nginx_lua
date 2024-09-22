# Dockerfile for Node.js service
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "yarn","start"]
