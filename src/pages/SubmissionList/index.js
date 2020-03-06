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

  const q = new Date();
  const m = q.getMonth();
  const d = q.getDay();
  const y = q.getFullYear();
  const date = new Date(y, m, d);

  return (
    <>
      <div className="seasons-header">
        <h2 className="season-name">{seasonName}</h2>

        {date < new Date("2020-03-13") && (
          <Link className="new-submission-button" to="./submissions/new">
            New
          </Link>
        )}
      </div>

      {Object.keys(submissions) &&
        Object.keys(submissions).map(key => (
          <Submission
            key={`submission_${key}`}
            submission={submissions[key]}
            submittor={key}
          />
        ))}
      <div className="dill-message">
        Hey Dolls, Once you submit you should see your email appear in this
        list! After all submissions are in on 3/13 you will be able to click on
        your email to see your bracket. <div>XOXO - Dill</div>
      </div>
    </>
  );
}

SubmissionList.propTypes = {
  seasonId: string,
  setSubmissions: func,
  submissions: object
};
