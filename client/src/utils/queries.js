import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
  username 
  breakCount
  isAdmin
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
  isAdmin 
  }
}
`;

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
  _id
  username
  isAdmin
  breakCount
  outOfSeatCount
  seatAwayCount
  seatAwayTaken {
    createdAt
  }  
  accommodations {
    title
    image
  }  
  breaks {
    _id
    createdAt
    breakDate
  }
  outOfSeat {
    createdAt
    username
  }
  }
}
`;
export const QUERY_ACCOMMODATION_CARDS = gql`
query accommodationCards {
  accommodationCards {
    title
    image
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

