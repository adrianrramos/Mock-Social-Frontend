import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import Logo from "../images/piggy.webp";

// MUI Components
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  form: {
    textAlign: "center",
  },
  pageTitle: {},
  imgLogo: {
    width: 10,
    height: "auto",
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img
          src={Logo}
          alt="Social Pig Official Logo"
          className={classes.imgLogoe}
        />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Login;
