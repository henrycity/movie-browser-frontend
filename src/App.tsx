import React from 'react';
import { css } from '@emotion/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'typeface-roboto';

import SignUp from './modules/SignUp';
import SignIn from './modules/SignIn';
import PrivateRoute from './PrivateRoute';
import Movie from './modules/Movie';

const App = () => {
  return (
    <div
      className="App"
      css={css`
        display: flex;
      `}
    >
      <Router>
        <PrivateRoute exact path="/">
          <Movie />
        </PrivateRoute>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Router>
    </div>
  );
};

export default App;
