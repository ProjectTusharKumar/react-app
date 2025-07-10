import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    name: localStorage.getItem('name'),
    employeeId: localStorage.getItem('employeeId'),
  });

  useEffect(() => {
    // Listen for storage changes (multi-tab support)
    const syncAuth = () => {
      setAuth({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        name: localStorage.getItem('name'),
        employeeId: localStorage.getItem('employeeId'),
      });
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const login = ({ token, role, name, employeeId }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    localStorage.setItem('employeeId', employeeId);
    setAuth({ token, role, name, employeeId });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, name: null, employeeId: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
