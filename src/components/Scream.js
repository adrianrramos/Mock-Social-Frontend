// Dependencies
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import CustomButton from "../components/CustomButton";
import DeleteScream from "./DeleteScream";
// MUI components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

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
  likeScream,
  unlikeScream,
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

  const isScreamLiked = () => {
    if (likes && likes.find(like => like.screamId === screamId)) return true;
    else return false;
  };

  const handleLikeScream = () => {
    likeScream(screamId);
  };

  const handleUnlikeScream = () => {
    unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <CustomButton tip="Like this OINK">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </CustomButton>
  ) : isScreamLiked() ? (
    <CustomButton tip="Unlike" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </CustomButton>
  ) : (
    <CustomButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </CustomButton>
  );

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
        {likeButton}
        <span>{likeCount} Likes</span>
        <CustomButton tip="Comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(Scream);
