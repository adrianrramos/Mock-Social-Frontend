import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import globalTheme from "../../util/theme";
import CustomButton from "../CustomButton";
// Materiel UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
// Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const styles = makeStyles({
  ...globalTheme,
  deleteButtonPosition: {
    marginLeft: 200,
  },
});

const DeleteScream = ({ screamId, deleteScream }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteScream = () => {
    deleteScream(screamId);
    setOpen(false);
  };

  const classes = styles();
  return (
    <Fragment>
      <CustomButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassname={classes.deleteButton}
        className={classes.deleteButtonPosition}
      >
        <DeleteOutline />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>DELETE OINK</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this oink?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteScream}
            variant="contained"
            color="secondary"
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired,
  deleteScream: PropTypes.func.isRequired,
};

export default connect(null, { deleteScream })(DeleteScream);
