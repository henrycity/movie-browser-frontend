import React from 'react';
import { useParams } from 'react-router-dom';

import { css } from '@emotion/core';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useGetMovieQuery } from './MovieItem.graphql.generated';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieInformation = () => {
  const { movieId } = useParams();
  const { loading, data } = useGetMovieQuery({ variables: { input: { id: parseInt(movieId) } } });

  if (loading || !data) {
    return <LoadingIndicator />;
  }

  const { movie } = data;

  const picturePath = movie.backdrop_path || movie.poster_path || '';
  return (
    <div
      css={css`
        display: flex;
        margin: 10%;
      `}
    >
      <img alt={movie.title} src={`${IMAGE_URL}${picturePath}`} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-left: 5%;
        `}
      >
        <h4>{movie.title}</h4>
        <div>Overview: {movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieInformation;
