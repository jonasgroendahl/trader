import React, { useState, useContext, useRef } from "react";
import { TextField, Button, Grid, Snackbar } from "@material-ui/core";
import Context from "../components/Context";
import { apiUrl } from "../utils/data";
import Spacer from "../components/Spacer";
import { Redirect } from "react-router-dom";
import logo from "../assets/tradesterWithText.png";

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

  const buttonRef = useRef(null);

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

    if (userResponse.message) {
      setSnackbar(userResponse.message);
    } else {
      window.localStorage.setItem("user", userResponse.id);
      setUser(userResponse);
      history.push("/");
    }
  }

  async function handleSignup() {
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
      setUser(newUser);
      history.push("/");
    } else {
      setSnackbar(response.message);
    }
  }

  return (
    <Grid container alignItems="center" className="container" direction="column">
      <img src={logo} height={180} alt="Handshake in green color" />
      {view === 0 ? (
        <>
          <Grid container alignItems="center" direction="column">
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
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    buttonRef.current.click();
                  }
                }}
              />
            </Grid>
            <Spacer />
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleLogin} ref={buttonRef}>
                Login
              </Button>
              <Button onClick={() => setView(1)}>Sign up</Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container direction="column" alignItems="center">
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
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
                fullWidth
              >
                Sign up
              </Button>
            </Grid>
            <Grid item>
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
    </Grid>
  );
}
