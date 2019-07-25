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
    if (process.env.NODE_ENV === "development" && false) {
      fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: "jonas.groendahl@gmail.com", password: "lol123" })
      })
        .then(res => res.json())
        .then(userResponse => console.log(userResponse) || setUser(userResponse));
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
