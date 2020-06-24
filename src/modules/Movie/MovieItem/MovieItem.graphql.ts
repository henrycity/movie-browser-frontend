import gql from 'graphql-tag';

const getMovie = gql`
  query getMovie($input: MovieInput!) {
    movie(input: $input) {
      id
      title
      backdrop_path
      poster_path
      overview
    }
  }
`;

const getLists = gql`
  query getLists {
    lists {
      id
      name
      movies {
        id
      }
    }
  }
`;

const addMovieToList = gql`
  mutation addMovieToList($input: AddMovieToListInput!) {
    addMovieToList(input: $input) {
      id
      name
      movies {
        id
      }
    }
  }
`;
