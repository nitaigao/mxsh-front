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

ENV API_HOST <API_HOST>
ENV FRONTEND_HOST <FRONTEND_HOST>
ENV SENTRY_PUBLIC_DSN <SENTRY_PUBLIC_DSN>
ENV SENTRY_PRIVATE_DSN <SENTRY_PRIVATE_DSN>

# install app
COPY . /app

# compile app
RUN yarn compile

EXPOSE 3000
CMD [ "yarn", "start" ]