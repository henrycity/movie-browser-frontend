import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MovieBrowser from './Browser/MovieBrowser';
import Movie from './MovieItem/MovieItem';

const Movies = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:movieId`} component={Movie} />
      <Route path={match.path} component={MovieBrowser} />
    </Switch>
  );
};

export default Movies;
