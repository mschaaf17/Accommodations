const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        accommodations: [Accommodation]
        breakCount: Int
        breaks: [Break]
        outOfSeatCount: Int
        outOfSeat: [OutOfSeat]

    }

type Accommodation {
    _id: ID
    title: String
    image: String
    username: String
   
}

type Break {
    _id: ID
    breakTaken: Boolean
    createdAt: String
    breakDate: String
    username: String
    breakCount: Int
}

type OutOfSeat {
    _id: ID
    createdAt: String
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
    break(username: String!) : [Break]
    outOfSeatQuery(username: String) : [OutOfSeat]
    
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addAccommodation(title: String, image: String): Accommodation
    addBreak(_id: ID): Break
    addOutOfSeat(_id: ID, username: String): OutOfSeat
}
`;

module.exports = typeDefs