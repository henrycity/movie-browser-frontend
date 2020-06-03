import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from './axios';

interface AuthContextProps {
  token: string;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: '',
  signin: () => {
    return new Promise((resolve) => resolve);
  },
  signup: () => {
    return new Promise((resolve) => resolve);
  },
  logout: () => {},
});

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const localStorageToken = localStorage.getItem('token');
  const [token, setToken] = useState(localStorageToken || '');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

  const logout = () => {
    localStorage.clear();
    setToken('');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Return the user object and auth methods
  return {
    token,
    signin,
    signup,
    logout,
  };
};

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
