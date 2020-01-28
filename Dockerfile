# First stage: Build the source code with Node
# Base on slim node image, nothing more is needed
FROM node:slim AS build
WORKDIR /app

# Add only configuration and run npm install to download dependencies
# This causes Docker to use the cached dependencies instead of downloading them every time
COPY ./package.json ./package-lock.json ./angular.json ./tsconfig.json ./
RUN npm install

# Add the Auth service API library and build it
COPY ./auth-api/ ./auth-api/
RUN npm run build auth-api

# Add the STOMP library and build it
COPY ./stomp/ ./stomp/
RUN npm run build stomp

# Add the commons library and build it
COPY ./common/ ./common/
RUN npm run build common

# Add the Auth service components library and build it
COPY ./auth-components/ ./auth-components/
RUN npm run build auth-components

# Add the full source code and build the apps
COPY ./ ./
RUN npm run build mls -- --prod

# Second stage: Configure nginx
FROM nginx:alpine AS runtime

COPY --from=build /app/dist/app/ /app/
COPY nginx.conf /etc/nginx/conf.d/default.conf
