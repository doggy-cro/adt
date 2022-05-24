<br/>
<p align="center">
ADT - ADDRESS DRIVEN TRACKER
</p>
<br/>

When I used coins tracker there is needed to specify amount of coins manually, which require to remember exactly how many tokens you have, in addition in case of any transaction it can changed and you need to edit it by yourself. ADT is tracker require only your public addresses and symbols and it automatically read on-chain data. Every time when your balance is changed, tracker automatically update data from chain. 

This repo contains the ADT source code for local development and running. For now it is not hosting publicly on any server.
If you would like to run this app locally, follow below steps.

## How to run it locally

There are two ways to run it locally. 

### Docker

this is the esiest way, just go to project root, and run:

```
docker-compose up
```

Sometimes if connection quality is not good, you can specify more time for docker to wait on resources, e.g.:

```
COMPOSE_HTTP_TIMEOUT=200 docker-compose up
```

### local host

#### setup react app
go to ui/ and type:
`yarn install`

when completed type:
`yarn start`

#### setup server
go to server and type:
`yarn install`

when completed, create .env file, then set following variables:
`ETHSCAN_API_KEY="my_etherscan_api_key"`

`DATABASE_URL="mongodb://127.0.0.1/chain-data"`

`CORS_URL="http://localhost:3000"`

`PORT="5000"`

to run server:
`yarn dev`

## How to add new tokens
### ui
ui/src/utils.js 

### server
add symbol to:
./chain/chainUtils.ts
in case of ethereum chain, go to ethTypes.ts and add symbol with their contract address.