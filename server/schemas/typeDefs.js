const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        accommodations: [Accommodation]
    }

type Accommodation {
    _id: ID
    title: String
    image: String
    username: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    accommodations(username: String): [Accommodation]
    accommodation(_id: ID!): Accommodation
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addAccommodation(title: String): Accommodation
}

`;

module.exports = typeDefs