const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Query {
    me: [User]
  }
`;

//export typeDefs
module.exports = typeDefs;
