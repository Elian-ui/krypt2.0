import React, { useEffect, useState } from "react";
import { SingleCoin } from "../Api/Api";
import axios from "axios";
import { Button, LinearProgress, TextField } from "@mui/material";
import CoinChart from "../components/CoinChart";
import { Link, NavLink, Outlet ,useParams} from "react-router-dom";
import { CryptoState } from "./CryptoContext";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { Interweave } from "interweave";

export const Coin = () => {
  const [coin, setcoin] = useState([]);
  const [description, setdescription] = useState();
  const { user,setalert ,watchlist} = CryptoState();
  const {coinid} = useParams();

  const inwatchList = watchlist.includes(coin.id)

  const removeFromwatchlist =async ()=>{
    const coinRef = doc(db,"watchlist",user.uid)

    try {
      await setDoc(coinRef,{
        coins:watchlist.filter((watch)=>(watch!==coin))
      },
      
      {merge:"true"})
      setalert({
        type:"success",
        message:`${coin.name} removed from watchlist`,
        open:true
      })
    } catch (error) {
      setalert({
        type:"error",
        message:error.message,
        open:true
    })
  }
}

  const addTowatchlist = async ()=>{
    const coinRef = doc(db,"watchlist",user.uid)

    try {
      await setDoc(coinRef,{
        coins:watchlist?[...watchlist,coin.id]:[coin.id]
      })
      setalert({
        type:"success",
        message:`${coin.name} added to watchlist`,
        open:true
      })
    } catch (error) {
      setalert({
        type:"error",
        message:error.message,
        open:true
    })
  }
}

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(coinid));
    setcoin(data);
    setdescription(data.description.en);
  };
  useEffect(() => {
    fetchCoin();
  }, [coinid]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {!coin || !description ? (
          <LinearProgress />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",            
            }}
          >
            <img
              src={coin.image.large}
              alt={coin.name}
              height={200}
              width={200}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {}}
            />
            <div>

            {<Interweave content={description.split(". ")[0]} />}
            {`.`}
            {` `}
            {<Interweave content={description.split(". ")[1]} />}
            {`.`}
            {` `}
            {<Interweave content={description.split(". ")[2]} />}
            {`.`}
            {` `}
            {<Interweave content={description.split(". ")[3]} />}
            {`.`}
            {<Interweave content={description.split(". ")[4]} />}
            </div>
            {
              <div
                style={{
                  display: "flex",
                  
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Button variant="contained" sx={{width:"100%",padding:"20px",height:"50px"}} onClick={inwatchList?removeFromwatchlist: addTowatchlist}>{inwatchList?'Remove from watchlist': 'Add to watchList'}</Button>
                {/* <Link to="/coinchart" ><Button variant="contained">CoinChart</Button></Link> */}
                
                  
                
              </div>
              
            }
            <div style={{width:"100%"}}>
            <CoinChart />
            </div>
          </div>
        )}
        
      </div>
      <Outlet />
    </>
  );
};
