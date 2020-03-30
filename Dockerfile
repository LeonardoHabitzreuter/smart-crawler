FROM mhart/alpine-node:12.13
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /app
COPY tsconfig.json tsconfig.json
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json
COPY src src
RUN yarn
RUN yarn build
RUN rm -rf src
EXPOSE 3000
CMD ["yarn", "start"]