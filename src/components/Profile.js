// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../util/theme";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//Icons
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
//Redux
import { connect } from "react-redux";

const useStyles = makeStyles({ ...globalTheme });

const Profile = ({
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
}) => {
  const handleImageChange = event => {
    const image = event.target.files[0];
    // FIXME: send to server
    const formData = new FormData();
    formData.append("image", image, image.name);

    this.props.uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
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
            <Tooltip title="Edit Photo" placement="top">
              <IconButton onClick={handleEditPicture} className="button">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
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
};

export default connect(mapStateToProps)(Profile);
