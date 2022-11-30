import { Box, Button, TextField, Typography } from "@mui/material";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { CryptoState } from "../CryptoContext";
import { auth } from "../firebase";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const { setalert, handleClose } = CryptoState();

  const googleProvider = new GoogleAuthProvider(auth);
  const signInwithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setalert({
          type: "success",
          open: true,
          message: "Sign in with google successful",
        });
        handleClose();
      })
      .catch((error) => {
        setalert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };
  const handleClick = async () => {
    if (!email || !password) {
      setalert({
        open: true,
        type: "error",
        message: "All fields must be filled",
      });
      return;
    }

    try {
      const r = await signInWithEmailAndPassword(auth, email, password);

      setalert({
        open: true,
        type: "success",
        message: `Welcome ${r.user.email}`,
      });
      handleClose();
    } catch (error) {
      setalert({
        open: true,
        type: "error",
        message: error.message,
      });
      return;
    }
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />

      <Button variant="contained" onClick={handleClick}>
        LogIn
      </Button>

      <Typography sx={{ color: "white" }}>OR</Typography>
      <GoogleButton onClick={signInwithGoogle} />
    </Box>
  );
};
export default LoginForm;
