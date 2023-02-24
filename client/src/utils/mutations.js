import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  user {
    username
    
  }  
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!) {
  addUser(username: $username, password: $password) {
    user {
      _id
      username
    }
    token
  }
}
`;

export const ADD_ACCOMMODATION = gql`
mutation addAccommodation ($title: String) {
  addAccommodation (title: $title) {
    title
  }
}
`;

export const ADD_BREAK = gql`
mutation AddBreak {
  addBreak {
    _id
    createdAt
  }
}
`;

export const ADD_OUT_OF_SEAT = gql`
mutation AddOutOfSeat ($username: String) {
  addOutOfSeat (username: $username) {
    username
  outOfSeatCount
      outOfSeat {
       createdAt
      }
    }
}
`;