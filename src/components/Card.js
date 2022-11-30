import React from "react";

function Card(props) {
  const cardstyle = {
    width: "300px",
    height: "300px",
    borderStyle: "solid",

    alignItems: "center",
  };
  return (
    <>
      <div style={cardstyle}>
        {" "}
        <img
          alt="test"
          src={props.image}
          style={{ width: "100%", maxHeight: "80%" }}
        ></img>
        Name:{props.name} <br></br>
        Age:{props.age}
      </div>
    </>
  );
}

export default Card;
