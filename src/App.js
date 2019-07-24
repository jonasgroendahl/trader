import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explore from "./navigationPages/Explore";
import Main from "./pages/Main";
import { ContextProvider } from "./components/Context";
import { CssBaseline } from "@material-ui/core";
import Login from "./pages/Login";
import theme from "./utils/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <ContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/profile" component={Explore} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Main} />
            </Switch>
          </BrowserRouter>
          <CssBaseline />
        </ContextProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
