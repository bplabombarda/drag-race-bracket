import React, { useEffect, useState } from 'react';
import { Link, Router } from '@reach/router';
import { object } from 'prop-types';

import firebase from 'Utils/firebase';
import Submission from 'Pages/Submission';
import SubmissionList from 'Pages/SubmissionList';

const db = firebase.firestore();

export async function addSubmission (season, { email, weeks }) {
  try {
    const collection = db.collection('seasons');
    const document = collection.doc(season);
    await document.collection('submissions').doc(email).set(weeks);
  } catch (error) {
    console.error('Could not add submission.');
  }
}

export async function fetchSubmissions (season) {
  const seasonsRef = await db.collection('seasons')
    .where('active', '==', true).get();
  const document = await seasonsRef.doc(season);
  const submissions = await document.collection('submissions')
    .docs.map(doc => {
      console.log(doc)
    });

  return submissions;
}

export default function Season ({ location }) {
  const [ season, setSeason ] = useState({ name: '', queens: [] });
  const [ submissions, setSubmissions ] = useState([]);

  useEffect(() => {
    setSeason(location.state.season);
  }, []);

  useEffect(() => {
    const freshSubs = fetchSubmissions(season.url);
    
    setSubmissions(freshSubs);
  }, []);

  return (
    <>
      <h2>{ season.name }</h2>
      <nav>
        <Link to='/'>Seasons</Link>{' '}
        <Link to=''>View All</Link>{' '}
        <Link to='submissions/new'>New</Link>{' '}
        <Link to='submissions/edit'>Edit</Link>
      </nav>
      <Router>
        <SubmissionList path='/' submissions={ submissions }/>
        <Submission path='submissions/edit' seasonObject={ season }/>
        <Submission path='submissions/new' seasonObject={ season }/>
      </Router>
    </>
  );
}

Season.propTypes = {
  location: object,
};
