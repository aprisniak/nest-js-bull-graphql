# NestJS Bull GraphQL Starter Kit

## Install docker & docker-compose

1. [Docker macOS](https://docs.docker.com/docker-for-mac/install/) or [Docker Windows](https://docs.docker.com/docker-for-windows/install/)
2. [docker-compose macOS/Windows](https://docs.docker.com/compose/install/)

## Setup environment

1. First o all you need to run `Redis` and `MongoDB` locally or change env variables in `development.env` file to remote hosts.
2. You can use `docker-compose.yml` to setting up local databases.
   1. `docker-compose up -d`
   2. `docker-compose down`

## Run project

1. Install dependencies — `npm i` or `yarn`.
2. Run project — `npm run start:dev` or `yarn start:dev`
3. Use GraphQL playground — `http://localhost:4000/graphql`

## Create `development.env` file

```dotenv
# MongoDB
DB_URL=127.0.0.1
DB_USER=db_name
DB_PASS=dbpassword # you also need to specify it in docker-compose.yml
DB_PORT=27017
DB_NAME=db_name

# Redis
REDIS_HOST=127.0.0.1
DB_REDIS_PASS=redis_password # you also need to specify it in docker-compose.yml
REDIS_PORT=7000

# Express session
SESSION_PASSWORD=super-secret-password

# GQL Mode
GRAPH_MODE=DEV
```
