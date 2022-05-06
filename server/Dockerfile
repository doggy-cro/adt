FROM node:14-slim

WORKDIR /server

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

# ENV ETHSCAN_API_KEY C39Z2IC1SD2757MF292HW7SC3FK7HZTBYC
# ENV DATABASE_URL mongodb://mongo/chain-data
# ENV CORS_URL http://localhost:3000

CMD ["yarn", "dev"]