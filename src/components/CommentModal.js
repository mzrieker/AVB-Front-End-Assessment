import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "30rem",
  },
  wide: {
    width: "25rem",
  },
}));

// Use state to track new comment data
const CommentModal = () => {
  const initialState = { id: "", name: "", comment: "" };

  const [name, setName] = useState(initialState.name);
  const [comment, setComment] = useState(initialState.comment);
  const [data, setData] = useState([]);

  var oldMessages = { data }[Object.keys({ data })[0]];
  var newId = 0;
  var isLoaded = false;
  const classes = useStyles();
  const dispatch = useDispatch();

  // Read in the current list of comments, ideally might want to refactor and put this logic in its own component for re-usability
  useEffect(() => {
    fetch("https://api.npoint.io/6891ac8dc8ef475bac81")
      .then((response) => response.json())
      .then((data) => setData(data))
      .then((oldMessages = { data }[Object.keys({ data })[0]]));
  }, []);

  // A rough way of checking if the previous comments are loaded in, only works bc we know we have existing comments would need to be refactored (likel using state)
  if (oldMessages.length > 0) {
    isLoaded = true;
    newId = oldMessages.length + 1;
  }

  const isOpen = useSelector(getViewCommentsModalOpen);

  const handleClose = () => dispatch(closeCommentsModal());

  const handleNameChange = (e) => setName(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleFormSubmit = (e) => {
    newId++;
    const obj = {
      id: "",
      name: "",
      comment: "",
    };

    // Send the data to our API
    fetch("https://api.npoint.io/6891ac8dc8ef475bac81", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        oldMessages.concat({ id: newId, name: name, comment: comment })
      ),
    });
  };

  // I really like how clean and simple cards are, so I use them here in the modal for adding new comments
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">Add New Comment</Typography>
          <form onSubmit={handleFormSubmit} className={classes.card}>
            <div className={classes.wide}>
              <TextField
                className={classes.wide}
                value={name}
                onChange={handleNameChange}
                label="Your Name"
              />
              <br />
            </div>
            <div>
              <TextField
                className={classes.wide}
                rows={6}
                multiline
                value={comment}
                onChange={handleCommentChange}
                label="Your Comment"
              />
            </div>
            <div className={classes.buttons}>
              {!isLoaded ? (
                <p>Loading...</p>
              ) : (
                <Button color="primary" type="submit">
                  Add Comment
                </Button>
              )}
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default CommentModal;
