import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    axios
      .post("/signup", newUserData)
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

export default Signup;
