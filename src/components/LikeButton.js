import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
// Icon
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

const LikeButton = ({
  likeScream,
  unlikeScream,
  screamId,
  user: { authenticated, likes },
}) => {
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

  const LikeButton = !authenticated ? (
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

  return LikeButton;
};

const mapStateToProps = state => ({
  user: state.user,
});

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { likeScream, unlikeScream })(
  LikeButton
);
