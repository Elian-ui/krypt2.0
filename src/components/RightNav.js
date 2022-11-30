import React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Button, Typography } from "@mui/material";
import { CryptoState } from "./CryptoContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { Coin } from "./Coin";

export default function Rightnav() {
  const { user, setalert, watchlist } = CryptoState();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const Logout = () => {
    signOut(auth);
    toggleDrawer();
    setalert({
      open: true,
      message: "Loggedout successfully",
      type: "success",
    });
  };
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              cursor: "pointer",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              style={{
                width: "300px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "92%",
                  width: "350px",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    alignItems: "center",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <Typography>WatchList</Typography>
                <span
                  style={{
                    alignItems: "center",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",

                    overflowY: "scroll",

                    width: "100%",
                  }}
                >
                  {watchlist.map((coin) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          textTransform: "uppercase",
                          alignItems: "center",
                          fontWeight:"800",
                          width:"80%",
                          backgroundColor:"grey",
                          borderRadius:"10px",
                          
                        }}
                      >
                        {` ${coin}`}
                        <Button onClick={()=>{watchlist.pop()}} variant="contained" color="error">
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </span>
              </div>
              <Button onClick={Logout}>Logout</Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
