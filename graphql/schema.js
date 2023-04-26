const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type RootQuery {
    hello: String!
  }

  type User {
    id: ID!,
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  input userInputData {
    name: String!
    email: String!
    password: String!
  }
  type RootMutation {
    createUser(userInput: userInputData): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);