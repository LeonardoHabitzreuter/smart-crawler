FROM mhart/alpine-node:12.13
COPY package.json /app/package.json
COPY nodemon.json /app/nodemon.json
COPY src /app/src
WORKDIR /app
EXPOSE 3007
CMD ["yarn", "dev"]