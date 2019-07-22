import React, { useState } from "react";
import { users } from "../utils/data";

const Context = React.createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState(users[0]);
  const [searching, setSearching] = useState(false);

  const value = {
    user,
    setUser,
    searching,
    setSearching
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Context;
