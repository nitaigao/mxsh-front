FROM node:7.4.0-onbuild

EXPOSE 25

ENV NODE_ENV production

ENTRYPOINT npm start

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update
RUN apt-get install yarn

RUN yarn install

EXPOSE 3000

ENTRYPOINT yarn start