import React, { useState, useEffect } from "react";
import Logo from "../images/piggy.webp";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

// MUI Components
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../util/theme";

const useStyles = makeStyles({ ...globalTheme });

const Signup = ({ signupUser, user, UI, UI: { loading } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI.errors]);

  const handleSubmit = e => {
    e.preventDefault();

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    signupUser(newUserData);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img
          src={Logo}
          alt="Social Pig Official Logo"
          className={classes.imgLogo}
        />
        <Typography variant="h3" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={e => handleSubmit(e)}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textFeild}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="@handle"
            className={classes.textFeild}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={e => setHandle(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textFeild}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textFeild}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Sign Up
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <div>
            <small>
              Already have an account? Login <Link to="/login">here</Link>
            </small>
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);
