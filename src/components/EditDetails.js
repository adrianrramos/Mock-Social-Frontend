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
    mapDetailsToState();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    mapDetailsToState();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location,
    };

    editUserDetails(userDetails);
    handleClose();
  };

  const mapDetailsToState = credentials => {
    credentials.bio && setBio(credentials.bio);
    credentials.website && setBio(credentials.website);
    credentials.loaction && setBio(credentials.loaction);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} className={classes.button}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textFeild}
              value={bio}
              onChange={event => setBio(event.target.value)}
            ></TextField>
            <TextField
              name="website"
              type="text"
              label="website"
              placeholder="Your own professional/personal site"
              className={classes.textFeild}
              value={website}
              onChange={event => setWebsite(event.target.value)}
            ></TextField>
            <TextField
              name="location"
              type="text"
              label="location"
              placeholder="Where you reside"
              className={classes.textFeild}
              value={location}
              onChange={event => setLocation(event.target.value)}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
