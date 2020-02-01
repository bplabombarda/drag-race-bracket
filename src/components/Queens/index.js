import React, { useEffect, useState } from 'react';

import firebase from 'Utils/firebase';

const db = firebase.firestore()

export default function Queens () {
  const [ imageUrl, setImageUrl ] = useState('');
  const [ name, setName ] = useState('');
  const [ queens, setQueens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('queens').get();
      const queensList = snapshot.docs.map(doc => doc.data());

      setQueens(queensList);
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newQueen = {
      imageUrl,
      name,
    };

    db.collection('queens').add(newQueen);
    setQueens([ ...queens, newQueen ]);

    setImageUrl('');
    setName('');
  }

  return (
    <>
      <h2>Add a New Queen:</h2>
      <form onSubmit={ handleSubmit }>
        <input
          name='name'
          onChange={ event => setName(event.target.value) }
          type='text'
          value={ name }
          />
        <input
          name='imageUrl'
          onChange={ event => setImageUrl(event.target.value) }
          type='text'
          value={ imageUrl } />
        <input
          name='Submit'
          type='submit'
          value="Submit"/>
      </form>

      <h2>Queens:</h2>
      <ul>
        {
          queens.map(({ name }, index) => (
            <li key={ index }>{ name }</li>
          ))
        }
      </ul>
    </>
  );
}
