import React, { useState } from "react";
import Logo from "../images/piggy.webp";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

// MUI Components
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../util/theme";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const useStyles = makeStyles({ ...globalTheme });

const Login = ({ UI: { loading }, UI, loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();

    if (UI.errors) {
      setErrors(UI.errors);
    }

    const userData = {
      email: email,
      password: password,
    };

    loginUser(userData);
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
          Login
        </Typography>
        <form noValidate onSubmit={e => handleSubmit(e)}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors.email}
            error={errors.email ? true : false}
            className={classes.textFeild}
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            className={classes.textFeild}
            value={password}
            onChange={e => setPassword(e.target.value)}
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
            Login
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <div>
            <small>
              Don't own an account? sign up <Link to="/signup">here</Link>
            </small>
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  loginUser: Proptypes.func.isRequired,
  user: Proptypes.object.isRequired,
  UI: Proptypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
