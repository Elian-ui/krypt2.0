import { Container, Typography } from "@mui/material";
import React from "react";
import { Carousel } from "./Carousel";

const bannerStyle = {
  backgroundImage: "URL(./image.jpeg)",
  backgroundSize: "cover",
};
const containerStyle = {
  display: "flex",
  backgrounColor: "#14161a",
  height: "100px",
  flexDirection: "column",
};
export const Banner = () => {
  return (
    <div style={bannerStyle}>
      <Container style={containerStyle}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
          }}
        >
          Crypto Here
        </Typography>
        <Typography variant="subtitle2">Never miss any price</Typography>
      </Container>
      <Carousel />
    </div>
  );
};
