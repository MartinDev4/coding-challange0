# Propeller - Backend Task

## Introduction

Build using NestJS, GraphQL, TypeORM and PostgreSQL.

The Project has complete GraphQL and REST capabilities.

## Installation

After you have cloned or downloaded the project do: `npm install`

### Important for database!

In order for the database to work you need to have Docker installed and running
Firstly do: `docker pull postgres`
After that: `docker run --name test-postgres -e POSTGRES_PASSWORD=test1234 -p 5432:5432 -d postgres`

For testing graphql, go to localhost:3000/graphql after doing: `npm run start:dev` or `npm run start`
