const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type AuthData {
    token: String!
    userId: String!
  }
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
    login(email: String!, password: String!): AuthData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);