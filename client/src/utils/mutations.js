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
mutation AddUser($username: String!, $password: String!, $isAdmin: Boolean) {
  addUser(username: $username, password: $password, isAdmin: $isAdmin) {
  token
  user {
    username
  }  
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
      }
  }
}
`;

export const REMOVE_ACCOMMODATION_FROM_STUDENT = gql`
mutation RemoveAccommodationFromStudent($accommodationId: ID!, $username: String!) {
  removeAccommodationFromStudent(accommodationId: $accommodationId, username: $username) {
    accommodations {
      title
      image
      _id
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

export const ADD_STUDENT_TO_LIST = gql`
mutation AddStudentToList($studentId: ID!) {
  addStudentToList(studentId: $studentId) {
    _id
    username
    students {
      username
      _id
    }
  }
}
`;

export const REMOVE_STUDENT_FROM_LIST = gql`
mutation RemoveStudentFromList($studentId: ID!) {
  removeStudentFromList(studentId: $studentId) {
    username
    students {
      username
      _id
    }
  }
}
`;