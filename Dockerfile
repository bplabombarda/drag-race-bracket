# Image
FROM mhart/alpine-node:10

# Vars
ARG ENV=${ENV:-dev}

# Copy / Move Files
WORKDIR /koa-react-boilerplate
COPY . /koa-react-boilerplate
RUN cd /koa-react-boilerplate

# Dependencies / Build
RUN npm install
RUN npm run build

# Start Up
EXPOSE 8080
CMD npm run start:${ENV}
