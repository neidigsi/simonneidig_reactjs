# production Dockerfile for React/Vite app
FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY package.json ./
COPY package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
EXPOSE 3000
CMD ["npx", "react-router-serve", "./build/server/index.js"]
