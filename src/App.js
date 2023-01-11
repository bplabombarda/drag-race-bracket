import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import {Header, Footer} from "./components/HeaderFooter"
import HomePage from "Pages/HomePage";
import Submissions from "./pages/Submissions";
import NewSubmission from "./pages/NewSubmission";
import MTQ from "./pages/MTQ";
import Standings from "Pages/Standings";
import ThankYou from "Pages/ThankYou";
import Rules from "Pages/Rules";
import firebase from "./utilities/firebase";

const db = firebase.firestore();

async function addSubmission(season, formState) {
   try {
     await db
       .collection("seasons")
       .doc(season)
       .collection("submissions")
       .doc(formState.name)
       .set(formState);
   } catch (error) {
     // eslint-disable-next-line no-console
     console.error(`Could not add submission.: ${error}`);
   }
 }

export default function App() {
  const [season, setSeason] = useState({queens:[]});

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
  console.log('season', season)
  return (
    <>
      <Header />
      <div className="app-container">
        <Router>
          <HomePage path="/" season={season} />
          <Submissions path="/submissions" season={season} />
          <NewSubmission
            path="/submissions/new"
            season={season}
            addSubmission={addSubmission}
          />
          <ThankYou path="/thanks" />
          <Rules path="/rules" />
          <MTQ path="/mtq" season={season} />
          <Standings path="/standings" season={season} />
        </Router>
      </div>
      <Footer />
    </>
  );
}


