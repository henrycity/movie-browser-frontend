import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  token: string;
  setToken: () => void;
}

const AuthContext = createContext<AuthContextProps | any>(undefined);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const auth = useProvideToken();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideToken = () => {
  const localStorageToken = localStorage.getItem('token');
  const [token, setToken] = useState(localStorageToken || '');

  // Return the user object and auth methods
  return {
    token,
    setToken,
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
