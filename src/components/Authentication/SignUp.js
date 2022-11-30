import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { CryptoState } from "../CryptoContext";
import { auth } from "../firebase";

const SignUp = () => {
  const { setalert } = CryptoState();
  const handleSubmit = () => {
    if (password !== confirmpassword) {
      setalert({ open: true, type: "error", message: "passwords dont match" });
      return;
    }
    try {
      const result = createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      setalert({
        open: true,
        message: `Sign up successful, Welcome ${email}`,
        type: "success",
      });
    } catch (error) {
      setalert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        label="Email"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
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
      <TextField
        label="Confirm password"
        type="password"
        value={confirmpassword}
        onChange={(e) => {
          setconfirmpassword(e.target.value);
        }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        SIGNUP
      </Button>
    </Box>
  );
};

export default SignUp;
