// Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import NoImg from "../../images/no-img.png";
// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
import Paper from "@material-ui/core/Paper";
//Icons
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//Redux
import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";
import CustomButton from "../layout/CustomButton";

const useStyles = makeStyles({
  ...globalTheme,
  skeletonImage: {
    marginLeft: 100,
  },
  skeletonBox: {
    display: "flex",
    flexDirection: "column",
  },
  skeletonText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  fullLine: {
    height: 15,
    width: "50%",
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: 0.55,
  },
  halfLine: {
    height: 15,
    width: "25%",
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: 0.55,
  },
});

const ProfileSkeleton = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.skeletonBox}>
        <div className={classes.skeletonImage}>
          <img src={NoImg} alt="user-profile" className={classes.image} />
        </div>
        <hr />
        <div className={classes.skeletonText}>
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
          <div className={classes.fullLine} />
        </div>
      </div>
    </Paper>
  );
};

export default ProfileSkeleton;
