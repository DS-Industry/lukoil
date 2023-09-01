FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.25-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx/default.conf /etc/nginx/sites-enabled/default
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]