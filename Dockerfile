FROM node:7.4.0-onbuild

ENV NODE_ENV production

EXPOSE 3000

ENTRYPOINT npm start