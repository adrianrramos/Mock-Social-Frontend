// Dependencies
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../util/theme";
// Redux
import { connect, createDispatchHook } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

const styles = makeStyles({ ...globalTheme });

const EditDetails = ({ editUserDetails, credentials }) => {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const classes = styles();

  useEffect(() => {
    credentials.bio && setBio(credentials.bio);
    credentials.website && setBio(credentials.website);
    credentials.loaction && setBio(credentials.loaction);
  }, []);

  return <React.Fragment></React.Fragment>;
};

EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
