import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
  username 
  accommodations {
    title
    image
  }
  } 
  }
`;
export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
  username
  accommodations {
    title
    image
  }  
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

