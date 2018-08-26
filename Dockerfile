FROM node:10.7.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
#COPY ./package-lock.json /usr/src/app/package-lock.json

# improve requirements build cache
RUN npm install

COPY . /usr/src/app

ENV PORT 80
EXPOSE 80

CMD npm start
