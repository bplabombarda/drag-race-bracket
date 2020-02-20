import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';

import Admin from 'Pages/Admin';
import Season from 'Pages/Season';
import SeasonList from 'Pages/SeasonList';
import firebase from 'Utils/firebase';

const db = firebase.firestore();

export async function fetchSeasons (setSeasons) {
  const seasonsRef = await db.collection('seasons')
    .where('active', '==', true).get();
  const seasonsList = seasonsRef.docs.map(doc => doc.data());

  setSeasons(seasonsList);
}

export default function App () {
  const [ seasons, setSeasons ] = useState([]);

  useEffect(() => {
    fetchSeasons(setSeasons);
  }, []);

  return (
    <Router>
      <SeasonList path='/' seasons={ seasons }/>
      <Season path='/seasons/:season/*'/>
      <Admin path='/admin/*' />
    </Router>
  );
}
