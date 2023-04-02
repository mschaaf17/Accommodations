import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  user {
    username
    isAdmin
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
      isAdmin
    }
    token
  }
}
`;
export const ADD_ACCOMMODATION_CARD = gql`
mutation addAccommodationCard($title: String, $image: String) {
  addAccommodationCard(title: $title, image: $image) {
    image
    title
}
}
`;

export const ADD_ACCOMMODATION_FOR_STUDENT = gql`
mutation AddAccommodationForStudent($title: String, $image: String, $username: String) {
  addAccommodationForStudent(title: $title, image: $image, username: $username) {
    accommodations {
      image
      title
      createdAt
    }
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