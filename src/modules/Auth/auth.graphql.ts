import gql from 'graphql-tag';

const signin = gql`
  mutation signin($input: AuthInput!) {
    signin(input: $input) {
      token
    }
  }
`;

const signup = gql`
  mutation signup($input: AuthInput!) {
    signup(input: $input) {
      token
    }
  }
`;
