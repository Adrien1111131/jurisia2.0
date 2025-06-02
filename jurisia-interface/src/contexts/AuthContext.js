import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('jurisia-auth') === 'true';
  });

  const checkAccessCode = (code) => {
    if (code === '5585') {
      setIsAuthenticated(true);
      localStorage.setItem('jurisia-auth', 'true');
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAccessCode }}>
      {children}
    </AuthContext.Provider>
  );
};
