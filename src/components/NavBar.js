import React from "react";
import { Link } from "react-router-dom";

// MUI STUFF
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} className="link" to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} className="link" to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} className="link" to="/signup">
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
