import React, { useEffect } from "react";
import { object, string, func } from "prop-types";
import { Link } from "@reach/router";

import firebase from "Utils/firebase";
import Submission from "Pages/Submission";

const db = firebase.firestore();

export default function SubmissionList({
  seasonId,
  setSubmissions,
  submissions,
  seasonName
}) {
  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissionsRef = await db
        .collection("seasons")
        .doc(seasonId)
        .collection("submissions")
        .get();

      const freshSubmissions = submissionsRef.docs.reduce((acc, doc) => {
        return {
          ...acc,
          [doc.id]: doc.data()
        };
      }, {});

      setSubmissions(freshSubmissions);
    };

    fetchSubmissions();
  }, []);

  return (
    <>
      <div className="seasons-header">
        <h2 className="season-name">{seasonName}</h2>
        <Link className="new-submission-button" to="./submissions/new">
          New
        </Link>
      </div>

      {Object.keys(submissions) &&
        Object.keys(submissions).map(key => (
          <Submission
            key={`submission_${key}`}
            submission={submissions[key]}
            submittor={key}
          />
        ))}
    </>
  );
}

SubmissionList.propTypes = {
  seasonId: string,
  setSubmissions: func,
  submissions: object
};
