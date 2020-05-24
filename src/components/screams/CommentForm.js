import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
// Redux
import { connect } from "react-redux";
import { postSingleComment } from "../../redux/actions/dataActions";

const style = makeStyles({ ...globalTheme });

const CommentForm = ({
  screamId,
  authenticated,
  postSingleComment,
  UI,
  UI: { loading },
}) => {
  const classes = style();

  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    } else if (!UI.errors && !loading) {
      setBody("");
      setErrors({});
    }
  }, [UI.errors, loading]);

  const handlePostComment = event => {
    event.preventDefault();
    postSingleComment(screamId, { body: body });
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={5}>
      <form onSubmit={e => e.preventDefault()}>
        <TextField
          name="body"
          type="text"
          label="Leave a comment"
          className={classes.textFeild}
          value={body}
          onChange={event => setBody(event.target.value)}
          error={errors.comment ? true : false}
          helperText={errors.comment}
        ></TextField>
        <Button
          onClick={handlePostComment}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          SEND
          {loading && (
            <CircularProgress
              size={30}
              className={classes.progressSpinner}
            ></CircularProgress>
          )}
        </Button>
      </form>
      <hr className={classes.hrVisible} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  postSingleComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { postSingleComment })(CommentForm);
