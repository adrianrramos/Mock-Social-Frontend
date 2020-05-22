import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";

// MUI STUFF
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

const NavBar = ({ authenticated }) => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <CustomButton tip="Oink !">
              <AddIcon />
            </CustomButton>
            <Link to="/">
              <CustomButton tip="Home">
                <HomeIcon />
              </CustomButton>
            </Link>
            <CustomButton tip="Notifications">
              <Notifications />
            </CustomButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} className="link" to="/">
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              className="link"
              to="/login"
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              className="link"
              to="/signup"
            >
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(NavBar);
