import axios from "axios";
import { React, useEffect, useState } from "react";
import { TrendingCoins } from "../Api/Api";

import AliceCarousel from "react-alice-carousel";
import { CryptoState } from "./CryptoContext";

export const Carousel = () => {
  const [trending, settrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    settrending(data);
  };

  useEffect(() => {
    fetchingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h > 0;
    return (
      <div style={{ textTransform: "uppercase" }}>
        <img src={coin.image} alt={coin.name} height="60" />
        <br />

        <span>
          {coin.symbol}

          <span style={{ color: profit > 0 ? "green" : "red" }}>
            {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <br />
        <span>
          {symbol} {coin.current_price.toFixed(2)}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div
      style={{
        paddingTop: "40px",
        alignItems: "center",
        display: "flex",
        height: "40%",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={15000}
        disableButtonsControls
        disableDotsControls
        autoPlay
        responsive={responsive}
        items={items}
      />
    </div>
  );
};
