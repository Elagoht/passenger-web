# Build stage
FROM node:20-alpine AS build

WORKDIR /app

ENV VITE_API_URL=http://debian
ENV VITE_API_PORT=13541

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install OpenSSL and Certbot
RUN apk add --no-cache openssl certbot certbot-nginx

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy and set permissions for entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV VITE_API_URL=http://debian
ENV VITE_API_PORT=13541

# Expose ports
EXPOSE 80 443

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
