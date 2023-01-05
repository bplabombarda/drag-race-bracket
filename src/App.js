import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import Season from "Pages/Season";
import HomePage from "Pages/HomePage";
import {Header, Footer} from "./components/HeaderFooter"
import firebase from "Utils/firebase";
import Enter from "./pages/Enter"
const db = firebase.firestore();

export default function App() {
  const [seasons, setSeasons] = useState({});

  async function fetchSeasons() {
    const seasonsRef = await db
      .collection("seasons")
      .where("active", "==", true)
      .get();
    
    console.log('seasonsRef', seasonsRef)

    const freshSeasons = seasonsRef.docs.reduce((acc, doc) => {
      return {
        ...acc,
        [doc.id]: doc.data(),
      };
    }, {});
    console.log('freshSeasons', freshSeasons)
    setSeasons(freshSeasons);
  }

  useEffect(() => {
    fetchSeasons(setSeasons);
  }, []);

  return (
    <>
      <Enter/>
      <Header />
      <Router>
        <HomePage path="/" seasons={seasons} />
        <Season path="/seasons/:seasonId/*" seasons={seasons} />
      </Router>
      <Footer />
    </>
  );
}


