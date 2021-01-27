import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, CircularProgress } from "@material-ui/core";

import Post from "./post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return !posts ? (
    // <Typography>No posts yet, please create one.</Typography>
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={2}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} setCurrId={setCurrId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
