import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import 'typeface-roboto';

import SignUp from './modules/Auth/SignUp';
import SignIn from './modules/Auth/SignIn';
import PrivateRoute from './PrivateRoute';
import Movies from './modules/Movie/Movies';

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Redirect to="/movie" />
        </PrivateRoute>
        <PrivateRoute path="/movie">
          <Movies />
        </PrivateRoute>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default App;
