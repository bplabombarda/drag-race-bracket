import React, { useEffect } from 'react';
import { object, string, func } from 'prop-types';

import firebase from 'Utils/firebase';

const db = firebase.firestore();

export default function SubmissionList ({ seasonId, setSubmissions, submissions }) {

  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissionsRef = await db
        .collection('seasons')
        .doc(seasonId)
        .collection('submissions')
        .get();
      
      const freshSubmissions = submissionsRef.docs.reduce((acc, doc) => {
        return {
          ...acc,
          [doc.id]: doc.data(),
        };
      }, {});

      setSubmissions(freshSubmissions);
    }
    
    fetchSubmissions();
  }, []);

  return (
    <ul>
      { Object.keys(submissions) &&
        Object.keys(submissions).map((key, index) => (
        <li key={ `submission_${index}` }>
          { key } 
        </li>
      ))}
    </ul>
  );
}

SubmissionList.propTypes = {
  seasonId: string,
  setSubmissions: func,
  submissions: object,
};
