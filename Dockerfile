FROM node:15.0.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

COPY ["server", "./server"]

COPY ["public", "./public"]

COPY ["database", "./database"]

RUN npm seed-db

EXPOSE 3000

CMD npm start