import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const token = user.token;
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
          Amazing Posts
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
            to="/auth"
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
