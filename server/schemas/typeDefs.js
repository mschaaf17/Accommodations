const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        accommodations: [Accommodation]
        breakCount: Int
        breaks: [Break]
        seatAwayCount: Int
        seatAwayTaken: [SeatAway]
        outOfSeatCount: Int
        outOfSeat: [OutOfSeat]

    }

type Accommodation {
    _id: ID
    title: String
    image: String
    username: String
    createdAt: String
   
}

type Break {
    _id: ID
    breakTaken: Boolean
    createdAt: String
    breakDate: String
    username: String
    breakCount: Int
}

type SeatAway{
    _id: ID
    seatAwayClicked: Boolean
    createdAt: String
    username: String
    seatAwayCount: Int
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
    seatAway(username: String!) : [SeatAway]
    outOfSeatQuery(username: String) : [OutOfSeat]
    outOfSeatToday(username: String, createdAt: String) : [OutOfSeat]
    
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addAccommodation(title: String, image: String, username: String): User
    addBreak(_id: ID): Break
    addSeatAway(_id: ID) : SeatAway
    addOutOfSeat(username: String): User
    removeAccommodation(title: String, username: String): User
}
`;

module.exports = typeDefs