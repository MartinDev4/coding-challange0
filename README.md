Build using NestJS, GraphQL, TypeORM and PostgreSQL.

I've added graphql and rest api support

For testing graphql, head to localhost:3000/graphql after doing: npm run start:dev or npm run start

Everything should work apart from the following query:

query {
products {
id,
images {
url,
}
}
}

I've spent a lot of time trying to figure it out but no luck so far
