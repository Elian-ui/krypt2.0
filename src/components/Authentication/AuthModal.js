import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "../Authentication/LoginForm";
import SignUp from "./SignUp";
import { CryptoState } from "../CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export function AuthModal() {
  const { handleOpen, handleClose, open } = CryptoState();

  return (
    <div>
      <Button onClick={handleOpen}>LOGIN</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <BasicTabs />
        </Box>
      </Modal>
    </div>
  );
}
export default AuthModal;

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        styles={{
          borderRadius: "10",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tab label="LOGIN" />
        <Tab label="SIGNUP" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp />
      </TabPanel>
    </Box>
  );
}
