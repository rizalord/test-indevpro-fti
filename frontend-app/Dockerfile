# Build react dockerfile
FROM node:alpine as build
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM softonic/node-prune:latest as pruner
COPY --from=build /app/node_modules /app/node_modules
RUN node-prune /app/node_modules

FROM node:alpine
WORKDIR /app
COPY --from=pruner /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/public /app/public

EXPOSE 4173
CMD yarn preview --host 0.0.0.0

