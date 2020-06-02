import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from './axios';

interface AuthContextProps {
  token: string;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  token: '',
  signin: () => {
    return new Promise((resolve) => resolve);
  },
  signup: () => {
    return new Promise((resolve) => resolve);
  },
});

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      setToken(localStorageToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorageToken}`;
    }
  }, []);

  const signin = async (email: string, password: string) => {
    const response = await axios.post('signin', {
      email,
      password,
    });
    const {
      data: { token },
    } = response;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
    setToken(token);
  };

  const signup = async (email: string, password: string) => {
    const response = await axios.post('signup', {
      email,
      password,
    });
    const {
      data: { token },
    } = response;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
    setToken(token);
  };

  // Return the user object and auth methods
  return {
    token,
    signin,
    signup,
  };
};

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
