import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
  username 
  students {
    username
    _id
  }
  breakCount
  hasBreaks
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
  _id
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
    _id
  }  
  breaks {
    _id
    createdAt
    breakDate
    username
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

