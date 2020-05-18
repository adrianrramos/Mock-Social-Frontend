import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

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
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
