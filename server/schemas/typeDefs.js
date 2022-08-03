const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        accommodations: [Accommodation]
    }

    type Message {
        id: ID!
        user: String!
        content: String!
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
    messages: [Message!]
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addAccommodation(title: String, image: String): Accommodation
    postMessage(user: String!, content: String!): ID!
}

`;

module.exports = typeDefs