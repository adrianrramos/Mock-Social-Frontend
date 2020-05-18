import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";

export class App extends Component {
  render() {
    return (
      <div className="app-body">
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
      </div>
    );
  }
}

export default App;
