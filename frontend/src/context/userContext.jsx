import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../api/users";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (userCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(userCredentials);
      const { token } = response;
      const decodedUser = jwtDecode(token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(decodedUser.user));
      setUser(decodedUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
