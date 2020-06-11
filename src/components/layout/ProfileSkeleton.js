// Dependencies
import React from "react";
import NoImg from "../../images/no-img.png";
// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  ...globalTheme,
  skeletonImage: {
    margin: "0 auto",
  },
  skeletonBox: {
    display: "flex",
    flexDirection: "column",
  },
  imageSkeleton: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: "50%",
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
          <img
            src={NoImg}
            alt="user-profile"
            className={classes.imageSkeleton}
          />
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
