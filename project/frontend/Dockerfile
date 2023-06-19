# Fetching the latest node image on apline linux
FROM node:16.15-alpine AS builder

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

# Copying all the files in our project
COPY . .

COPY ./frontend.env.local ./.env
# COPY ./frontend.env.prod ./.env

# Building our application
RUN yarn build

# Fetching the latest nginx image
FROM nginx:alpine

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Install necessary packages
RUN apk add --no-cache curl busybox-extras bind-tools

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
