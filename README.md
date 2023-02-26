## Form Builder API

This project is an API built for Form Builder application.

## Requirements
- Node.js - minimal v16.0.0
- Mongodb - minimal v4.0.0

For production:
- Docker
- Docker Compose

## Installation

```bash
$ npm install
```

## Usage (run the server)

### Development mode
Create .env file with filled following parameters:
```dotenv
# Mongo Connection
DB_ADDR=localhost
DB_PORT=27017
DB_NAME=MasterForms
DB_USER="{fill this field}"
DB_PASS="{fill this field}"

# Mail Sender Configuration
MAIL_USER="{fill this field}"
MAIL_DOMAIN="{fill this field}"
MAIL_PASS="{fill this field}"

# Application Configuration
JWT_SECRET="{fill this field}"
ENABLE_SSL=false
```

Run the server
```bash
$ npm run start:dev
```

### production mode (docker)
You need to have ssl certificate keys in secrets directory:
 - private-key.pem
 - public-certificate.pem

Create mongodb.docker.env file with filled following parameters:
```dotenv
# MONGODB
MONGO_INITDB_ROOT_USERNAME="{fill this field}"
MONGO_INITDB_ROOT_PASSWORD="{fill this field}"
```

Create application.docker.env file with filled following parameters:
```dotenv
# Mongo Connection
DB_ADDR=mongodb
DB_PORT=27017
DB_NAME=MasterForms
DB_USER="{must be exactly the same as MONGO_INITDB_ROOT_USERNAME}"
DB_PASS="{must be exactly the same as MONGO_INITDB_ROOT_PASSWORD}"

# Mail Sender Configuration
MAIL_USER="{fill this field}"
MAIL_DOMAIN="{fill this field}"
MAIL_PASS="{fill this field}"

# Application Configuration
JWT_SECRET="{fill this field}"
ENABLE_SSL=true
```

Build docker container
```bash
$ docker build --tag "master-forms-api" .
```

Run docker containers
```bash
$ docker-compose up -d
```

Server will be available at port 80

## Test

### unit tests
```bash
$ npm run test
```

### e2e tests
```bash
$ npm run test:e2e
```

### test coverage
```bash
$ npm run test:cov
```

## Technologies used
- Nest.js (https://nestjs.com)
- Mongodb (https://www.mongodb.com)
