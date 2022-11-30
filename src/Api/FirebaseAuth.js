import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {

    apiKey: "AIzaSyADuwFd8Wn9N7PqFS7LttCpOM3PdUAEHYQ",
  
    authDomain: "krypt-coinviewer.firebaseapp.com",
  
    projectId: "krypt-coinviewer",
  
    storageBucket: "krypt-coinviewer.appspot.com",
  
    messagingSenderId: "529697836921",
  
    appId: "1:529697836921:web:a24b6c66cafc5517e769a8",
  
    measurementId: "G-6W1TWRMZQH"
  
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
  
  const analytics = getAnalytics(app);
  export default firebaseConfig;