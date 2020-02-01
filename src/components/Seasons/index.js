import React, { useEffect, useState } from 'react';

import firebase from 'Utils/firebase';

const db = firebase.firestore()

export default function Seasons () {
  const [ queens, setQueens ] = useState([]);
  const [ seasons, setSeasons ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('queens').get();
      const queensList = snapshot.docs.map(doc => doc.data());

      setQueens(queensList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('seasons').get();
      const seasonsList = snapshot.docs.map(doc => doc.data());

      setSeasons(seasonsList);
    };
    fetchData();
  }, [seasons]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newSeasons = {};

    db.collection('seasons').add(newSeasons);
    setQueens([ ...seasons, newSeasons ]);
  }

  return (
    <>
      <h2>Add a New Season:</h2>
      <form onSubmit={ handleSubmit }>
        <input
          name='name'
          onChange={ event => setName(event.target.value) }
          type='text'
          value={ '' }
          />
        <input
          name='imageUrl'
          onChange={ event => setImageUrl(event.target.value) }
          type='text'
          value={ '' } />
        <input
          name='Submit'
          type='submit'
          value="Submit"/>
      </form>

      <h2>Seasons:</h2>
      <ul>
        {
          seasons.map(({ name }, index) => (
            <li key={ index }>{ name }</li>
          ))
        }
      </ul>
    </>
  );
}
