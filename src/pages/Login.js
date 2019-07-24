import React, { useState, useContext } from "react";
import { TextField, Button, Grid, Snackbar } from "@material-ui/core";
import Context from "../components/Context";
import { apiUrl } from "../utils/data";
import Spacer from "../components/Spacer";
import { Redirect } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login({ history }) {
  const { user, setUser } = useContext(Context);

  const [login, setLogin] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    city: "Copenhagen",
    name: "",
    country: ""
  });
  const [view, setView] = useState(0);
  const [snackbar, setSnackbar] = useState("");

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: login.email, password: login.password })
    });
    const userResponse = await response.json();

    console.log(userResponse);

    if (userResponse.message) {
      setSnackbar(userResponse.message);
    } else {
      setUser(userResponse);
      history.push("/");
    }
  }

  async function handleSignup() {
    console.log("Signing up");

    const payload = {
      email: login.email,
      password: login.password,
      city: login.city,
      country: login.country,
      name: login.name
    };

    const res = await fetch(`${apiUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const response = await res.json();

    if (response.insertId) {
      const newUser = {
        ...payload,
        id: response.insertId,
        listings: [],
        excludeList: [],
        conversations: []
      };
      console.log(newUser);
      setUser(newUser);
      history.push("/");
    } else {
      setSnackbar(response.message);
    }
  }

  return (
    <div className="container">
      <img src={logo} height={120} alt="A leaf" />
      {view === 0 ? (
        <>
          <h1>Login</h1>
          <Grid container direction="column">
            <Grid item>
              <TextField
                margin="dense"
                label="Email"
                value={login.email}
                name="email"
                type="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                label="Password"
                value={login.password}
                name="password"
                type="password"
                onChange={handleChange}
              />
            </Grid>
            <Spacer />
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
              <Button onClick={() => setView(1)}>Sign up</Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <h1>Sign up</h1>
          <Grid container direction="column">
            <Grid item>
              <TextField
                margin="dense"
                label="Email"
                value={login.email}
                name="email"
                type="email"
                onChange={handleChange}
                required
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                label="Password"
                value={login.password}
                name="password"
                type="password"
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                label="Repeat password"
                value={login.repeatPassword}
                name="repeatPassword"
                type="password"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                label="Name"
                value={login.name}
                name="name"
                type="name"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                label="Country"
                value={login.country}
                name="country"
                type="country"
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                label="City"
                value={login.city}
                name="city"
                type="city"
                onChange={handleChange}
                required
              />
            </Grid>
            <Spacer />
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignup}
                disabled={
                  !login.city ||
                  !login.country ||
                  !login.password ||
                  login.password !== login.repeatPassword ||
                  !login.name
                }
              >
                Sign up
              </Button>
              <Button onClick={() => setView(0)}>Log into another account</Button>
            </Grid>
          </Grid>
        </>
      )}
      <Snackbar
        open={Boolean(snackbar)}
        message={<span>{snackbar}</span>}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
      />
      {user.id ? <Redirect to="/" /> : null}
    </div>
  );
}
