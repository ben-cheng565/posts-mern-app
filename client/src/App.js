import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/navBar/NavBar";
import Home from "./components/home/Home";
import useStyles from "./appStyles";
import Auth from "./components/auth/Auth";

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
