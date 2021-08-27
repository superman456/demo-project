### STAGE 1: Build ###
FROM node:latest AS Jsnode
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build--prod
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=JSnode /app/dist/demo-project/ usr/share/nginx/html
