FROM node:7.4.0-onbuild

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && sudo apt-get install yarn

ENV NODE_ENV production

EXPOSE 3000

ENTRYPOINT yarn start