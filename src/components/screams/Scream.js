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
    borderRadius: 0,
  },
  image: {
    minWidth: 50,
    height: 50,
    borderRadius: "50%",
    margin: "10px 0 0 15px",
  },
  content: {
    padding: "5px 0 0 25px",
    objectFit: "cover",
  },
  textRow: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    marginRight: 10,
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
  openDialog,
}) => {
  const classes = useStyles();

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  dayjs.extend(relativeTime);
  return (
    <Card key={screamId} className={classes.card} variant="outlined">
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <div className={classes.textRow}>
          <Typography variant="body1">
            <Link
              to={`/users/${userHandle}`}
              className={`link ${classes.userName}`}
            >
              <strong>{userHandle}</strong>
            </Link>
            {dayjs(createdAt).fromNow()}
          </Typography>
          {deleteButton}
        </div>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} </span>
        <CustomButton tip="Comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount}</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          likes={likes}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Scream);
