# Use the official Node.js 16 image as the base image for all stages
FROM node:16 AS base

# Set the working directory for the base image
WORKDIR /app

# Copy shared module and install its dependencies
COPY shared/package.json ./shared/
RUN cd shared && npm install && npm link

# Copy package.json files for each service
COPY api-gateway/package.json ./api-gateway/
COPY auth-service/package.json ./auth-service/
COPY tracking-service/package.json ./tracking-service/
COPY user-service/package.json ./user-service/
COPY vehicle-service/package.json ./vehicle-service/

# Install dependencies for each service and link the shared module
RUN cd api-gateway && npm install && npm link shared && cd ..
RUN cd auth-service && npm install && npm link shared && cd ..
RUN cd tracking-service && npm install && npm link shared && cd ..
RUN cd user-service && npm install && npm link shared && cd ..
RUN cd vehicle-service && npm install && npm link shared && cd ..

# Copy the shared module and source code for each service
COPY shared ./shared
COPY api-gateway ./api-gateway
COPY auth-service ./auth-service
COPY tracking-service ./tracking-service
COPY user-service ./user-service
COPY vehicle-service ./vehicle-service

# Build stage for each service
FROM base AS api-gateway
WORKDIR /app/api-gateway
CMD ["node", "src/server.js"]

FROM base AS auth-service
WORKDIR /app/auth-service
CMD ["node", "src/server.js"]

FROM base AS tracking-service
WORKDIR /app/tracking-service
CMD ["node", "src/server.js"]

FROM base AS user-service
WORKDIR /app/user-service
CMD ["node", "src/server.js"]

FROM base AS vehicle-service
WORKDIR /app/vehicle-service
CMD ["node", "src/server.js"]
