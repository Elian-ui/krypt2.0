import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { CryptoState } from "./CryptoContext";
import { Link, NavLink } from "react-router-dom";
import { CurrencyBitcoin } from "@mui/icons-material";
import AuthModal from "./Authentication/AuthModal";
import Rightnav from "./RightNav";

export const NavBar = () => {
  const { coinid,currency, setcurrency, user } = CryptoState();

  return (
    <AppBar position="sticky">
      
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#14161a",
          }}
        >
           <Link style={{color:"white"}} to ='/'>
          <Box sx={{ display: "flex" }}>
           
            <CurrencyBitcoin />
            <Typography>KRYPT</Typography>
            
          </Box>
          </Link>
          <Box sx={{ display: {xs:"none",sm:["block","flex"]}, alignItems: "center" }}>
            <NavLink to="/">
              <Button>Home</Button>
            </NavLink>
            <NavLink to={`coin/${coinid}`}>
            <Button>Coin</Button>
            </NavLink>
            <NavLink to="coinchart">
              <Button>Chart</Button>
            </NavLink>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              sx={{ height: "40px" }}
              value={currency}
              onChange={(e) => {
                setcurrency(e.target.value);
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"JPY"}>JPY</MenuItem>
            </Select>
            {user ? <Rightnav /> : <AuthModal />}
          </Box>
        </Toolbar>
      
    </AppBar>
  );
};
