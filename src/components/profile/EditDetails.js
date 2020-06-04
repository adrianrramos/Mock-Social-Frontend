// Dependencies
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import CustomButton from "../layout/CustomButton";
// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
// Redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const styles = makeStyles({
  ...globalTheme,
  button: {
    float: "right",
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

const EditDetails = ({ editUserDetails, credentials }) => {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const classes = styles();

  useEffect(() => {
    mapDetailsToState(credentials);
  }, [credentials]);

  const handleOpen = () => {
    setOpen(true);
    mapDetailsToState(credentials);
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
    credentials.website && setWebsite(credentials.website);
    credentials.location && setLocation(credentials.location);
  };

  return (
    <Fragment>
      <CustomButton
        tip="Edit Profile"
        placement="top"
        onClick={handleOpen}
        className={classes.button}
      >
        <EditIcon color="primary" />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your profile details</DialogTitle>
        <DialogContent>
          <form className={classes.editForm}>
            <TextField
              name="bio"
              type="text"
              variant="filled"
              label="bio "
              placeholder="A short bio about yourself"
              className={classes.textFeild}
              value={bio}
              onChange={event => setBio(event.target.value)}
            ></TextField>
            <TextField
              name="website"
              type="text"
              variant="filled"
              label="website"
              placeholder="Your own professional/personal site"
              className={classes.textFeild}
              value={website}
              onChange={event => setWebsite(event.target.value)}
            ></TextField>
            <TextField
              name="location"
              type="text"
              variant="filled"
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
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

EditDetails.propTypes = {
  credentials: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
