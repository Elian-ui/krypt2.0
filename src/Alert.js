import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { CryptoState } from "./components/CryptoContext";

const Alerts = () => {
  const { alert, setalert } = CryptoState();
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setalert({ open: false });
  };

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          elevation={10}
          variant="flled"
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Alerts;
