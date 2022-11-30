import {
  Box,
  Button,
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Api/Api";
import { CryptoState } from "./CryptoContext";
import { Search } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

export const CoinsTable = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(false);
  const { navigate } = useNavigate();
  const { coinid,currency, symbol, setcoinid } = CryptoState();

  const fetchCoins = async () => {
    setloading(true);
    const { data } = await axios.get(CoinList(currency));
    setcoins(data);
    setloading(false);
  };
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  const [searched, setsearched] = useState("");
  const [searchh, setsearchh] = useState("");

  const handleSearch = () => {
    return coins.filter((coin) => {
      if (searched === "") {
        return coin;
      } else {
        return (
          coin.name.toLowerCase().startsWith(searched.toLowerCase()) ||
          coin.symbol.toLowerCase().startsWith(searched.toLowerCase())
        );
      }
    });
  };

  return (
    <Box sx={{gap:"2rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Typography variant="h5">Crypto currencies by Market Cap</Typography>
      <TextField
        style={{ width: "100%" }}
        label="Search for Currency"
        variant="outlined"
        value={searched}
        onChange={(e) => {
          setsearched(e.target.value);
        }}
        sx={{
          backgroundColor: "whitesmoke",
          color: "white",
          display: { xs: "none" },
        }}
      />

      <Box sx={{ display: { sm: "none" } }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Search for Currency"
            variant="outlined"
            value={searchh}
            onChange={(e) => {
              setsearchh(e.target.value);
            }}
            
          ></TextField>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => {
              setsearched(searchh);
            }}
          >
            {" "}
            Search
            <Search />
          </Button>
        </Box>
      </Box>
      <Box>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {["Coin", "Price", "24hr Change", "MarketCap"].map(
                  (item, index) => {
                    return (
                      <TableCell>
                        <div style={{ color: "white" }}>{item}</div>
                      </TableCell>
                    );
                  }
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch().map((coin, index) => {
                let profit = coin.price_change_percentage_24h > 0;

                return (
                  
                  <TableRow key={coin.name}>
                  <NavLink to={`coin/${coinid}`} >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ color: "white",cursor:"pointer",display:"flex" }}
                      key={coin.name}
                      onClick={
                        () => {setcoinid(coin.id);
                        
                      }}
                    >
                  
                      
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "22",
                          
                        }}
                      >
                        <img
                        src={coin.image}
                        style={{ height:"60px" }}
                        alt={coin.name}
                      />
                        <span style={{ textTransform: "uppercase" }}>
                          {coin.symbol}
                        </span>
                        <span>{coin.name}</span>
                      </div>
                    </TableCell>
                    </NavLink>
                    
                    <TableCell style={{ color: "white", alignItems: "center" }}>
                      <div>{symbol} {coin.current_price.toFixed(2)}</div>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ color: profit > 0 ? "green" : "red" }}
                    >
                      {profit && "+"}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      {symbol}
                      {(coin.market_cap/1000000).toFixed(0)}B
                    </TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>
    </Box>
  );
};
