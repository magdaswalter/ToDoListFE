# # Stage 1
# FROM node:12 as react-build
# WORKDIR /app
# COPY . ./
# RUN npm i \
#     && npm run-script build

# # Stage 2 - the production environment
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=react-build /app/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]