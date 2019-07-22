import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Explore from "./navigationPages/Explore";
import Main from "./pages/Main";
import { ContextProvider } from "./components/Context";
import { CssBaseline } from "@material-ui/core";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
