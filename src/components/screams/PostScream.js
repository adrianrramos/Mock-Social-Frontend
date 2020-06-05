import React, { Fragment, useState, useEffect } from "react";
import CustomButton from "../layout/CustomButton";
import PropTypes from "prop-types";
// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
//icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import { DialogContent } from "@material-ui/core";

const styles = makeStyles({
  ...globalTheme,
  submitButton: { position: "absolute" },
  progressSpinner: { position: "absolute" },
  closeButton: { position: "absolute", left: "90%", top: "10%" },
});

const PostScream = ({ postScream, clearErrors, UI: { loading }, UI }) => {
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    } else if (!UI.errors && !loading) {
      setBody("");
      setOpen(false);
      setErrors({});
    }
  }, [UI.errors, loading]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearErrors();
    setOpen(false);
  };

  const handlePostScream = event => {
    event.preventDefault();
    postScream({ body: body });
  };

  const classes = styles();
  return (
    <Fragment>
      <CustomButton tip="Oink !" onClick={handleOpen}>
        <AddIcon />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Oink what's on your mind!{" "}
          <span role="img" aria-label="Pig">
            🐷
          </span>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={e => e.preventDefault()}
            className={classes.submitForm}
          >
            <TextField
              name="body"
              type="text"
              label="body"
              placeholder="Oink away..."
              className={classes.textFeild}
              value={body}
              onChange={event => setBody(event.target.value)}
              error={errors.body ? true : false}
              helperText={errors.body}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handlePostScream}
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
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  PostScream
);
