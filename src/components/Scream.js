import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    width: 125,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
});

const Scream = ({
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
        <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Scream;
