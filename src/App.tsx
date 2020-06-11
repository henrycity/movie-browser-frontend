import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'typeface-roboto';

import PrivateRoute from './components/PrivateRoute';
import MovieWatchList from './modules/Movie/MovieWatchList';
import LoadingIndicator from './components/LoadingIndicator';

const Movies = lazy(() => import('./modules/Movie/Movies'));
const SignUp = lazy(() => import('./modules/Auth/SignUp'));
const SignIn = lazy(() => import('./modules/Auth/SignIn'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingIndicator />}>
        <Switch>
          <PrivateRoute exact path="/">
            <Redirect to="/movie" />
          </PrivateRoute>
          <PrivateRoute path="/movie">
            <Movies />
          </PrivateRoute>
          <PrivateRoute path="/list">
            <MovieWatchList />
          </PrivateRoute>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
