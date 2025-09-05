# Multi-stage build
# Stage 1: Build the static site
FROM node:21-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the site
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx

# Copy in the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static website from the builder stage
COPY --from=builder /app/_site /usr/share/nginx/html

EXPOSE 8080