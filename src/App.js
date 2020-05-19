// Dependencies
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import jwtDecode from "jwt-decode";
// Styling
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import globalTheme from "./util/theme";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Components
import NavBar from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";

let authenticated;

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

const theme = createMuiTheme({ ...globalTheme });

export class App extends Component {
  render() {
    return (
      <div className="app-body">
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <div className="container">
              <NavBar />
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
