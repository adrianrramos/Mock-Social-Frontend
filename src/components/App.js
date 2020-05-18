import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import '../App.css';

export class App extends Component {
    render() {
        return (
            <div className="app-body">
                <BrowserRouter>
                    <Switch>
                        <Route exact to="/"  component={Home} />
                        <Route exact to="/login" component={Login} />
                        <Route exact to="/signup" component={Signup} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
