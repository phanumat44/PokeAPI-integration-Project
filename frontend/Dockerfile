# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve stage
FROM node:20-alpine

WORKDIR /app

# Install simple http server for serving static content
RUN npm install -g serve

# Copy built assets
COPY --from=build /app/dist ./dist

# Expose the standard vite port
EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
