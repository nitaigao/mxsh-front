FROM mhart/alpine-node:7.4.0

WORKDIR /app

# install build tools
RUN apk add --no-cache make gcc g++ python curl bash
RUN npm install -g yarn@0.17.10 --quiet

# install deps
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install

# remove un-used build tools
RUN apk del make gcc g++ python

ENV API_HOST http://back
ENV FRONTEND_HOST http://mxsh.io

ENV SENTRY_PUBLIC_DSN https://152e61414974418995a7dd86ab45a8cb@sentry.io/135520
ENV SENTRY_PRIVATE_DSN https://152e61414974418995a7dd86ab45a8cb:cb5c99929d644282aa512d8769bcbece@sentry.io/135520

# install app
COPY . /app

# compile app
RUN yarn compile

EXPOSE 3000
CMD [ "yarn", "start" ]