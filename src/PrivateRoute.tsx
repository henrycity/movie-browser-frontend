import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './utils/auth';

interface PrivateRouteProps {
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ children, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
