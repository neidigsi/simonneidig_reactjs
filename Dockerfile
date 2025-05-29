# Production Dockerfile for React/Vite SSR app

# Build stage: install dependencies and build the app
FROM node:22-alpine as build
WORKDIR /app
# Install dependencies (production only)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
# Copy all source files
COPY . .
# Build the SSR app
RUN npm run build

# Runtime stage: only production files and dependencies
FROM node:22-alpine
WORKDIR /app
# Copy built app and public assets from build stage
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
# Copy package files and install only production dependencies
COPY package.json ./
COPY package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
# Expose SSR server port
EXPOSE 3000
# Start the SSR server
CMD ["npx", "react-router-serve", "./build/server/index.js"]
