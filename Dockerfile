FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

#FROM nginx:alpine
#VOLUME /var/cache/nginx
#COPY --from=angular app/dist/projeto-angular-v1 /usr/share/nginx/html
#COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

FROM  nginx:1.17
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY --from=angular app/dist/projeto-angular-v1 /usr/share/nginx/html

EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]


#docker build -t app-cnh-digital .
#docker run -p 8080:80 app-cnh-digital