import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = makeStyles({
  ...globalTheme,
  commentImage: {
    width: 75,
    height: 75,
    borderRadius: "50%",
    objectFit: "cover",
  },
});

const Comments = ({ comments }) => {
  const classes = styles();
  return (
    <Grid container>
      {comments &&
        comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={10}>
                <Grid container>
                  <Grid item sm={3}>
                    <img
                      src={userImage}
                      alt="user who commented"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={7}>
                    <div classes={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.hrVisible} />
              )}
            </Fragment>
          );
        })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
