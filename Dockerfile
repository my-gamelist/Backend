# Common build stage
FROM node:16-alpine3.16 as build

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 3000

FROM node:16-alpine3.16

COPY package.json ./

RUN npm install --only=production

COPY --from=build /app/node_modules/.prisma/client /node_modules/.prisma/client

COPY --from=build /app/dist ./dist

COPY --from=build /app/swagger.yaml ./dist/swagger.yaml

CMD ["node", "dist/server.js"]