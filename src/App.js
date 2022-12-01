import React, { useEffect, useState } from "react";
import { Router, Link, Redirect } from "@reach/router";
import Season from "Pages/Season";
import HomePage from "Pages/HomePage";
import firebase from "Utils/firebase";
import MMWD from './MMWD'

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
      <header>
        <Link className="dillcap" to="/">
          dillcap
        </Link>
      </header>
      <Router>
        <Redirect from="/" to="MMwD"/>
        <HomePage path="/" seasons={seasons} />
        <Season path="/seasons/:seasonId/*" seasons={seasons} />
        <MMWD path="/MMwD"></MMWD>
      </Router>
    </>
  );
}


