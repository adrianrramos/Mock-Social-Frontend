import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import Logo from "../images/piggy.webp";
import { Link } from "react-router-dom";
import history from "../history";
import axios from "axios";

// MUI Components
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password,
    };
    axios
      .post("/login", userData)
      .then(res => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        history.push("/");
      })
      .catch(err => {
        setErrors(err.response.data);
        setLoading(false);
      });
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

const useStyles = makeStyles({
  form: {
    textAlign: "center",
  },
  pageTitle: {
    marginBottom: 10,
  },
  imgLogo: {
    width: 100,
    height: "auto",
    margin: "30px auto",
  },
  textFeild: {
    margin: "10px auto",
  },
  button: {
    margin: "20px auto",
    textAlign: "center",
  },
  customError: {
    color: "red",
  },
  progress: {},
});

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Login;
