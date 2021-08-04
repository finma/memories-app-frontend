import React, { useEffect, useState } from "react";
import { Typography, Button, Paper, TextField, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./style";
import { createPost, updatePost } from "../../config/redux/actions";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector(
    (state) => currentId && state.postsReducers.find((p) => p._id === currentId)
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }

    handleClear();
  };

  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6">
          Please Sign In for create post memories!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Update" : "Create"} a Memories
        </Typography>
        <TextField
          fullWidth
          name="title"
          label="Title"
          variant="outlined"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          fullWidth
          name="message"
          label="Message"
          variant="outlined"
          minrows={3}
          multiline
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          fullWidth
          name="tags"
          label="Tags"
          variant="outlined"
          value={postData.tags}
          placeholder="tag,tags,moretags"
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Grid
          container
          className={classes.buttonContainer}
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item xs={12} sm={12}>
            <Button
              className={classes.buttonSubmit}
              variant="outlined"
              color="secondary"
              size="medium"
              fullWidth
              onClick={handleClear}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="medium"
              type="submit"
              fullWidth
            >
              {currentId ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
