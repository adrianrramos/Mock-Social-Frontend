// Dependencies
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import CustomButton from "../CustomButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
// MUI components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 125,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
});

const Scream = ({
  user: {
    authenticated,
    credentials: { handle },
    likes,
  },
  scream: {
    body,
    createdAt,
    userHandle,
    userImage,
    screamId,
    likeCount,
    commentCount,
  },
}) => {
  const classes = useStyles();

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  dayjs.extend(relativeTime);
  return (
    <Card key={screamId} className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
          className="link"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <CustomButton tip="Comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} Comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          likes={likes}
        />
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Scream);
