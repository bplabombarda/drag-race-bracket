import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import {Header, Footer} from "./components/HeaderFooter"
import HomePage from "Pages/HomePage";
import Enter from "./pages/Enter"
import Submissions from "./pages/Submissions";
import MTQ from "./pages/MTQ";
import Standings from "Pages/Standings";
import firebase from "Utils/firebase";


const db = firebase.firestore();

export default function App() {
  const [season, setSeason] = useState({});

  async function fetchSeasons() {
    const seasonsRef = await db
      .collection("seasons")
      .where("active", "==", true)
      .get();
    
    const activeSeason = seasonsRef.docs[0].data(); 
    setSeason(activeSeason);
  }

  useEffect(() => {
    fetchSeasons(setSeason);
  }, []);

  return (
    <>
      <Enter />
      <Header />
      <div className="app-container">
        <Router>
          <HomePage path="/" season={season} />
          <Submissions path="/submissions" season={season} />
          <MTQ path="/mtq" season={season} />
          <Standings path="/standings" season={season} />
        </Router>
      </div>
      <Footer />
    </>
  );
}


