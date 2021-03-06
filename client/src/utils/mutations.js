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