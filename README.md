# ST Trot Race Demo Project

This repo contains source code of ST Trot Race Demo Project.

First, Create an .env file locally. You can duplicate .env.sample and name the new copy as .env. Add the variables value as per your needs and configuration.

## Docker configuration

### Create Dockerfile for Nodejs App

__Dockerfile__ defines a list of commands that Docker uses for setting up the Node.js application environment.

### Write Docker Compose configurations

Create a __docker-compose.yml__ file, in root directory.

Below commands build images specified in docker-compose.yml file

```
docker-compose build
```

Below commands builds the image if they are not located locally and starts the containers. if images are already build, it will run the container directly in background without build.

```
docker-compose up -d 
```

(Please make sure to run `docker-compose build` command each time making change in local repo)

### Mongo DB

URI for Docker mongo DB access:
```
mongodb://mongo:27018/st_docker_db 
(27018 default Specified PORT and st_docker_db is database name in docker-compose.yml file)
```

URI for local mongo DB access:
```
mongodb://localhost:27017/st_local_db
(27017 default Specified PORT and st_local_db is database name in .env file)
```

NOTE: When running in local make sure your MongoDB service is up and running in your system. 

## Local configuration

```
npm install
```

### Running application

```
npm start
```

## Directory Structure

```
- src
  - config (contains database configuration)
  - controllers (contains controller functions of application)
  - interfaces (defined interfaces)
  - middlewares (contains middleware to authorize user)
  - models (contains mongoose schema)
  - services (contains services of application)
  - tests (contains test file)
  app.ts (initial functions to initiate application)
  server.ts (entry point for running express server)
```

## Test Details

### Run test

```
npm test
```

## Module Dependecies

|             NPM            | Version |
|:--------------------------:|:-------:|
| axios                      | ^0.24.0 |
| mongoose                   | ^17.0.2 |
