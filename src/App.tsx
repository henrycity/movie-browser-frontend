import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'typeface-roboto';

import SignUp from './modules/SignUp';
import SignIn from './modules/SignIn';
import PrivateRoute from './PrivateRoute';
import Movie from './modules/Movie';

const App = () => {
  return (
    <Router>
      <PrivateRoute exact path="/">
        <Movie />
      </PrivateRoute>
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
    </Router>
  );
};

export default App;
