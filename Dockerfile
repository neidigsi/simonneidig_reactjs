# Production Dockerfile for React/Vite SSR app

# Build stage: install dependencies and build the app
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Install ALL dependencies (including dev) for build tools
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy all source files
COPY . .

# Set VITE_BACKEND_URL to /api before build
RUN sed -i 's/^VITE_BACKEND_URL=.*/VITE_BACKEND_URL=\/api/' .env || echo 'VITE_BACKEND_URL=https:\/\/simon-neidig.eu\/api' >> .env

# Build the SSR app
RUN npm run build


# Runtime stage: only production files and dependencies
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy built app and public assets from build stage
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public

# Copy package files and install only production dependencies
COPY package.json ./
COPY package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Expose SSR server port
EXPOSE 3000
EXPOSE 80

# Start the SSR server
CMD ["/bin/sh", "-c", "npx react-router-serve ./build/server/index.js & nginx -g 'daemon off;'"]
