import React, { useState, useEffect } from "react";
import { apiUrl } from "../utils/data";

const Context = React.createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState({
    id: 0,
    email: "",
    password: "",
    city: "",
    country: "",
    name: "",
    listings: [],
    excludeList: []
  });
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    // when app is booted, check if user has been logged in before, if so log the user in
    const userLoggedInBefore = window.localStorage.getItem("user");
    if (userLoggedInBefore) {
      fetch(`${apiUrl}/user/${userLoggedInBefore}`)
        .then(res => res.json())
        .then(result => {
          setUser(result);
        });
    }
  }, []);

  const value = {
    user,
    setUser,
    searching,
    setSearching
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Context;
