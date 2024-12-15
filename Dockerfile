FROM node:18 AS build
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.23

COPY --from=build /app/dist/credit-card-management/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]