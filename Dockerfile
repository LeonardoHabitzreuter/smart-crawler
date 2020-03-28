FROM mhart/alpine-node:12.13
ENV NODE_ENV production
ENV PORT 3007
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json
COPY src src
RUN yarn
RUN yarn build
RUN rm -rf src
EXPOSE 3007
CMD ["yarn", "start"]