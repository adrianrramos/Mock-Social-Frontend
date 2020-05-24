// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Icons
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//Redux
import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";
import CustomButton from "../CustomButton";

const useStyles = makeStyles({ ...globalTheme });

const Profile = ({
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
  uploadImage,
  logoutUser,
}) => {
  const handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    logoutUser();
  };

  const classes = useStyles();

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="user profile" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={event => handleImageChange(event)}
            />
            <CustomButton
              tip="Edit Photo"
              onClick={handleEditPicture}
              btnClassName="button"
              placement="top"
            >
              <EditIcon color="primary" />
            </CustomButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <React.Fragment>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </React.Fragment>
            )}
            {website && (
              <React.Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {"   "}
                  {website}
                </a>
                <hr />
              </React.Fragment>
            )}
            <CalendarToday color="primary" />
            {"  "}
            <span> Joined</span>
            {"   " + dayjs(createdAt).format("MMM YYYY")}
          </div>
          <CustomButton tip="Logout" placement="top" onClick={handleLogout}>
            <KeyboardReturn />
          </CustomButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login
        </Typography>
        <div className={classes.profileButtons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p> loading...</p>
  );

  return profileMarkup;
};

const mapStateToProps = state => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser, uploadImage })(Profile);
