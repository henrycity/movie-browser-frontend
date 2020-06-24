import gql from 'graphql-tag';

const getMovies = gql`
  query getMovies($input: MoviesInput!) {
    movies(input: $input) {
      id
      title
      backdrop_path
      poster_path
    }
  }
`;

const createList = gql`
  mutation createList($input: CreateListInput!) {
    createList(input: $input) {
      id
      name
      movies {
        id
      }
    }
  }
`;
