const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        accommodations: [Accommodation]
        students: [User]
        breakCount: Int
        hasBreaks: Boolean
        breaks: [Break]
        seatAwayCount: Int
        seatAwayTaken: [SeatAway]
        outOfSeatCount: Int
        outOfSeat: [OutOfSeat]
        isAdmin: Boolean
        outOfSeatCountByDay: [OutOfSeatCountByDay]
        outOfSeatCountByDayVirtual: [OutOfSeatCountByDay]

    }
    type OutOfSeat {
        _id: ID
        createdAt: String
        username: String
    }
    
    type OutOfSeatCountByDay {
        createdAt: String
        count: Int
        username: String
      }

type Accommodation {
    _id: ID
    title: String
    image: String
    username: String
    createdAt: String
   
}

type AccommodationCards {
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
}

type SeatAway{
    _id: ID
    seatAwayClicked: Boolean
    createdAt: String
    username: String
    seatAwayCount: Int
}


type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    accommodationCards: [Accommodation]
    accommodations(username: String): [Accommodation]
    accommodation(_id: ID!): Accommodation
    students(username: String!): User
    break(username: String!) : [Break]
    seatAway(username: String!) : [SeatAway]
    outOfSeatQuery(username: String) : [OutOfSeat]
    outOfSeatToday(username: String, createdAt: String) : [OutOfSeat]
    outOfSeat(username: String) : [OutOfSeat]
}

type Mutation {
    login(username: String!, password: String!, isAdmin: Boolean): Auth
    addUser(username: String!, password: String!, isAdmin: Boolean): Auth
    addAccommodationForStudent(title: String, image: String, username: String): User
    addBreak(_id: ID): Break
    addSeatAway(_id: ID) : SeatAway
    addOutOfSeat(username: String): User
    removeAccommodationFromStudent(accommodationId: ID!, username: String!): User
    addAccommodationCard(title: String, image: String, username: String): AccommodationCards
    removeAccommodationCard(_id: ID): AccommodationCards
    addStudentToList(studentId: ID!): User
    removeStudentFromList(studentId: ID!): User
}
`;

module.exports = typeDefs