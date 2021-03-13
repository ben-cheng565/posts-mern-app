import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import useStyles from "./styles";
import { useCallback } from "react";

const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    let token;
    if (user) {
      token = user.token;
    }
    // Check if the logined user expire or not
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          className={classes.title}
          variant="h5"
          align="center"
          component={Link}
          to="/"
        >
          Highlights Posts
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user != null ? (
          <div className={classes.profile}>
            <Avatar alt={user.result.name} src={user.result.image}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/signin"
            className={classes.login}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
