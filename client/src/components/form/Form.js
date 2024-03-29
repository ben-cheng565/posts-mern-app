import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../redux/actions/posts";
import FileUpload from "./upload/fileUpload";

import useStyles from "./styles";

const initState = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const Form = ({ currId, setCurrId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // get current post info from state
  const post = useSelector((state) =>
    currId ? state.posts.find((p) => p._id === currId) : null
  );
  const [postData, setPostData] = useState(initState);
  const user = JSON.parse(localStorage.getItem("profile"));

  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currId) {
      // update post info
      dispatch(updatePost(currId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(
        createPost({
          ...postData,
          selectedFile: filePath,
          name: user?.result?.name,
        })
      );
    }
    clear();
  };

  const clear = () => {
    setCurrId(0);
    setPostData(initState);
  };

  /* if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own posts.
        </Typography>
      </Paper>
    );
  } */

  return (
    <Paper className={`${classes.root} ${classes.form}`}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currId ? "Editing" : "Creating"} a post
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          autoFocus
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <FileUpload setFilePath={setFilePath} />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={user?.result?.name ? false : true}
        >
          Submit
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
