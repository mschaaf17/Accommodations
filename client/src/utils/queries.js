import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
  username 
  breakCount
  accommodations {
    title
    image
  }
  breaks {
    _id
    createdAt
    breakDate
  }
  } 
  }
`;

export const QUERY_USERS = gql`
query Users {
  users {
  username  
  }
}
`;

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
  _id
  username
  breakCount
  accommodations {
    title
    image
  }  
  breaks {
    _id
    createdAt
    breakDate
  }
  }
}
`;
export const QUERY_BREAKS = gql`
query Break($username: String!) {
  break(username: $username) {
_id
createdAt
  }
}
`;


export const QUERY_ACCOMMODATIONS = gql`
query accommodations {
  accommodations {
  title
  image
  username
  }
}
`;

