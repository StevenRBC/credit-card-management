FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.23
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80