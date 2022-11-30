import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chartDays } from '../Api/data';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { HistoricalChart } from "../Api/Api";
import axios from "axios";
import { Button, LinearProgress } from "@mui/material";
import { CryptoState } from "./CryptoContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const [historicalData, sethistoricalData] = useState();
  const [days, setdays] = useState(1)
  const { currency ,coinid} = CryptoState();
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coinid,days,currency));
    sethistoricalData(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData()
  },[days])
  
  

  return <div>
  
  {!historicalData?(
    <LinearProgress />
  ):(
    <>
    {<div style={{
      fontSize:"30px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>{`${coinid.toUpperCase()} CHART`}</div>}
  <Line data={{
    labels: historicalData.map((coin)=>{
    let date = new Date(coin[0]);
    let time =
    date.getHours() > 12
    ? `${date.getHours()-12}:${date.getMinutes()}PM`
    :`${date.getHours()}:${date.getMinutes()}AM`

  return days === 1? time: date.toLocaleDateString()
  }),

  datasets: [
    {data:historicalData.map((coin)=>coin[1]),
    label:`Price (past ${days}) Days in usd`,
    borderColor:"white"
  }
    
  ]}} />
  <div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:20,
    }}>
  {chartDays.map((day)=>(
    <Button variant="contained" key={day.value}
    onClick={()=>{setdays(day.value)}}
    >{day.label}</Button>
  ))}
  </div></>
  )  
  }

  
  </div>;
};

export default CoinChart;
