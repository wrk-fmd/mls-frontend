# First stage: Build the source code with Node
# Base on slim node image, nothing more is needed
FROM node:slim AS build
WORKDIR /app
RUN npm set unsafe-perm true

# Add only configuration and run npm install to download dependencies
# This causes Docker to use the cached dependencies instead of downloading them every time
COPY ./package.json ./package-lock.json ./angular.json ./tsconfig.json ./
RUN npm install

# Add the i18n library and build it
COPY ./common-i18n/ ./common-i18n/
RUN npm run build common-i18n

# Add the forms library and build it
COPY ./common-forms/ ./common-forms/
RUN npm run build common-forms

# Add the data library and build it
COPY ./common-data/ ./common-data/
RUN npm run build common-data

# Add the UI library and build it
COPY ./common-ui/ ./common-ui/
RUN npm run build common-ui

# Add the Auth service API library and build it
COPY ./auth-api/ ./auth-api/
RUN npm run build auth-api

# Add the login library and build it
COPY ./auth-login/ ./auth-login/
RUN npm run build auth-login


# Add the Auth service components library and build it
COPY ./auth-components/ ./auth-components/
RUN npm run build auth-components

# Add the CoCeSo API library and build it
COPY ./coceso-api/ ./coceso-api/
RUN npm run build coceso-api

# Add the CoCeSo components library and build it
COPY ./coceso-components/ ./coceso-components/
RUN npm run build coceso-components

# Add the application and build it
COPY ./mls/ ./mls/
COPY ./styles/ ./styles/
RUN npm run build mls -- --prod

# Second stage: Configure nginx
FROM nginx:alpine AS runtime

COPY --from=build /app/dist/mls/ /app/
RUN chmod 644 /app/favicon.ico
RUN chmod 644 /app/assets/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
