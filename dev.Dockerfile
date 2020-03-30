FROM mhart/alpine-node:12.13
WORKDIR /app
COPY tsconfig.json tsconfig.json
COPY package.json package.json
COPY nodemon.json nodemon.json
COPY yarn.lock yarn.lock
COPY src src
EXPOSE 3000
CMD ["yarn", "dev"]