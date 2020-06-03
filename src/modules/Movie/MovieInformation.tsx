import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../utils/axios';
import { CircularProgress } from '@material-ui/core';
import { css } from '@emotion/core';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieInformation = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`api/movie/${movieId}`).then(({ data }) => {
      setMovie(data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <CircularProgress />;
  }
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
