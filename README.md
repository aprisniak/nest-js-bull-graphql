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

## Create `docker-compose.yml`

```yaml
version: '3.8'

services:
  redis:
    container_name: redis
    image: 'bitnami/redis:latest'
    environment:
      - REDIS_PASSWORD=redis_password
      - REDIS_DISABLE_COMMANDS=FLUSHDB,FLUSHALL
      - REDIS_PORT_NUMBER=7000
    ports:
      - '7000:7000'
    networks:
      - services

  mongodb:
    container_name: mongodb
    image: 'bitnami/mongodb:latest'
    ports:
      - '27017:27017'
    environment:
      - MONGODB_ENABLE_IPV6=yes
      - MONGODB_ENABLE_DIRECTORY_PER_DB=yes
      - MONGODB_ROOT_PASSWORD=db_root_password
      - MONGODB_USERNAME=db_user_name
      - MONGODB_PASSWORD=db_user_password
      - MONGODB_DATABASE=db_name
    networks:
      - services

networks:
  services:
    driver: bridge
    driver_opts:
      com.docker.network.enable_ipv6: "true"
    ipam:
      driver: default
      config:
        - subnet: 172.15.240.0/24
          gateway: 172.15.240.1
        - subnet: 2002:AC0F:F000::AC0F:F000/64
          gateway: 2002:AC0F:F000::AC0F:F000:1
```
