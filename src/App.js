import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import globalTheme from "./util/theme";

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
