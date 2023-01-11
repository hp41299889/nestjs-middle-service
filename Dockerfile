FROM node:16.16.0
WORKDIR /app
COPY . ./
RUN [ "mkdir", "jsFile" ]
RUN [ "npm", "install", "--omit=dev" ]
CMD [ "npm", "run", "start:nodemon" ]