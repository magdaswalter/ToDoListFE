# Stage 1
FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/to-do-list-fe
WORKDIR /srv/app/to-do-list-fe

COPY package.json /srv/app/to-do-list-fe
COPY package-lock.json /srv/app/to-do-list-fe

RUN npm install

COPY . /srv/app/to-do-list-fe

CMD ["npm", "start"]
