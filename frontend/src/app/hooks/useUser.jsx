// UserContext.js
'use client';
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    profileImagePath: '',
  });
  console.log(user);
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};

// Custom hook to consume the context
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
