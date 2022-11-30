import React from "react";
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Coin } from "./components/Coin";
import CoinChart from "./components/CoinChart";
import { HomePage } from "./components/HomePage";

import { NavBar } from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Alerts from "./Alert";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const stylesApp = {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <div style={stylesApp}>
          <NavBar></NavBar>
          <Routes>
          <Route path='/' element={<HomePage />} />
          
            <Route path="coin/:coinid" element={<Coin />} />
            <Route path="coinchart" element={<CoinChart />} />
          
            </Routes>
          <Alerts />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
