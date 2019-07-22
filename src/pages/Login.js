import React, { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import Context from "../components/Context";
import { users } from "../utils/data";

export default function Login({ history }) {
  const { user, setUser } = useContext(Context);

  const [login, setLogin] = useState({ email: "", password: "" });

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  function handleLogin() {
    setUser(users[1]);
    history.push("/");
  }

  return (
    <div className="container">
      <h1>Login...</h1>
      <TextField
        margin="dense"
        label="email"
        value={login.email}
        name="email"
        type="email"
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="password"
        value={login.password}
        name="password"
        type="password"
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}
