import React, { useEffect } from "react";
import { object, string, func } from "prop-types";
import { Link } from "@reach/router";
import getScore from "Utils/getScore";

import firebase from "Utils/firebase";
import Submission from "Pages/Submission";

const db = firebase.firestore();

export default function SubmissionList({
  seasonId,
  setSubmissions,
  submissions,
  seasonName,
  results,
  finished,
  submissionsOpen,
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
          [doc.id]: doc.data(),
        };
      }, {});

      setSubmissions(freshSubmissions);
    };

    fetchSubmissions();
  }, []);

  const emails = Object.keys(submissions)
    .map((email) => {
      return getScore(email, submissions, results);
    })
    .sort(function (a, b) {
      return b.score - a.score;
    });

  return (
    <>
      <div className="seasons-header">
        <h2 className="season-name">{seasonName}</h2>
        {submissionsOpen && (
          <Link className="new-submission-button" to="submissions/new">
            New
          </Link>
        )}
      </div>

      {Object.keys(submissions) &&
        emails.map((obj, i) => (
          <Submission
            key={`submission_${obj.email}`}
            submission={submissions[obj.email]}
            submittor={obj.email}
            score={obj.score}
            winner={i === 0 && finished}
          />
        ))}
    </>
  );
}

SubmissionList.propTypes = {
  seasonId: string,
  setSubmissions: func,
  submissions: object,
};
