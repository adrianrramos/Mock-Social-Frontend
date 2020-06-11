import React, { Fragment } from "react";
import NoImg from "../../images/no-img.png";
// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";

const styles = makeStyles({
  ...globalTheme,
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 50,
    height: 50,
    borderRadius: "50%",
    margin: "10px 0 0 15px",
  },
  handle: {
    width: 60,
    height: 20,
    backgroundColor: globalTheme.palette.primary.main,
    opacity: 0.55,
    margin: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: 0.55,
    marginBottom: 5,
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: 0.55,
  },
});

const PostSkeleton = () => {
  const classes = styles();

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index} variant="outlined">
      <img className={classes.cover} src={NoImg} alt="this user" />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {};

export default PostSkeleton;
