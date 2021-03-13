import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Input from "./Input";
import Icon from "./Icon";
import { signUp } from "../../redux/actions/auth";

import useStyles from "./styles";

const initFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initFormData);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(formData, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    if (!res) {
      console.log("No response from Google.");
      return false;
    }
    const result = res.profileObj;
    const token = res.tokenId;
    try {
      dispatch({ type: "AUTH", payload: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was unsuccessful.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="firstName"
              label="First Name"
              half
              autoFocus
              handleChange={handleChange}
            />
            <Input
              name="lastName"
              label="Last Name"
              half
              handleChange={handleChange}
            />

            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />

            <Input
              name="confirmPassword"
              label="Repeat Password"
              type="password"
              handleChange={handleChange}
            />
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <GoogleLogin
            clientId="288754269017-kbeiljsgb9mu18anqrfr437g410uams8.apps.googleusercontent.com"
            render={(props) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={props.onClick}
                disabled={props.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
