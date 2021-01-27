import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";

import Form from "../form/Form";
import Posts from "../posts/Posts";

import { getPosts } from "../../redux/actions/posts";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  const [currId, setCurrId] = useState(0);
  // const [isCreated, setIsCreated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrId={setCurrId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currId={currId} setCurrId={setCurrId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
