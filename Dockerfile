FROM node:16.15-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npx hardhat compile
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/token-maker /usr/share/nginx/html
EXPOSE 80