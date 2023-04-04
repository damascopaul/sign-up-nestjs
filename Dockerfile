# BUILD stage
FROM node:18.12.1-alpine as build
WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

# RUN stage
FROM node:18.12.1-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --production

COPY --from=build /build/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start:prod"]