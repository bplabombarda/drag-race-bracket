import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";

import Admin from "Pages/Admin";
import Header from "./components/Header";
import Season from "Pages/Season";
import SeasonList from "Pages/SeasonList";
import firebase from "Utils/firebase";

const db = firebase.firestore();

export default function App() {
  const [seasons, setSeasons] = useState({});

  async function fetchSeasons() {
    const seasonsRef = await db
      .collection("seasons")
      .where("active", "==", true)
      .get();

    const freshSeasons = seasonsRef.docs.reduce((acc, doc) => {
      return {
        ...acc,
        [doc.id]: doc.data(),
      };
    }, {});

    setSeasons(freshSeasons);
  }

  useEffect(() => {
    fetchSeasons(setSeasons);
  }, []);

  return (
    <>
      <Header />
      <Router>
        <SeasonList path="/" seasons={seasons} />
        <Season path="/seasons/:seasonId/*" seasons={seasons} />
        <Admin path="/admin/*" />
      </Router>
    </>
  );
}
