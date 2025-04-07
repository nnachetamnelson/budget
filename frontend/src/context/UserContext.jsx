
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (token) {
      axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
        .then((res) => {
          console.log("User fetched:", res.data);
          setUser(res.data.user || res.data); 
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setToken(null); 
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken: updateToken, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


