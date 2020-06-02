import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MovieBrowser from './MovieBrowser';
import Movie from './Movie';

export default () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:movieId`} component={Movie} />
      <Route path={match.path} component={MovieBrowser} />
    </Switch>
  );
};
