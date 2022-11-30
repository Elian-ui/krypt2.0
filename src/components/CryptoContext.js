import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setcurrency] = useState("USD");
  const [symbol, setsymbol] = useState("$");
  const [user, setuser] = useState(null);
  const [coinid, setcoinid] = useState('bitcoin')
  const [watchlist, setwatchlist] = useState([])
  const [alert, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setuser(user);
      else setuser(null);
    });
  }, [user]);

  // useEffect(() => {
  //   if(user){
  //     const coinRef = doc(db,'watchlist',user.uid) 
  //     onSnapshot(coinRef,coin=>{
  //       if(coin.exists()){
  //         setwatchlist(coin.data().coins)
  //         console.log(coin.data().coins)
  //       }
  //     })
  //     console.log(watchlist)
     
  //   }
  // }, [user])
  

  useEffect(() => {
    if (currency === "USD") {
      setsymbol("$");
    }
    if (currency === "EUR") {
      setsymbol("£");
    }
    if (currency === "JPY") setsymbol("¥");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setcurrency,
        symbol,
        alert,
        setalert,
        open,
        setOpen,
        handleClose,
        handleOpen,
        user,
        coinid,
        setcoinid,
        watchlist
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
