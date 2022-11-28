import React, { useEffect } from "react";
import { object, string, func, bool } from "prop-types";
import { Link } from "@reach/router";
import getScore from "Utils/getScore";

import firebase from "Utils/firebase";
import Submission from "./Submission.js";

const db = firebase.firestore();

export default function SubmissionList({
  seasonId,
  setSubmissions,
  submissions,
  seasonName,
  results,
  finished,
  submissionsOpen,
  colors,
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

  const names = Object.keys(submissions)
    .map((name) => {
      return getScore(name, submissions, results);
    })
    .sort(function (a, b) {
      return b.score - a.score;
    });

  return (
    <>
      <div className="seasons-header">
        <h2 className="season-name" style={{ color: colors.primary }}>
          {seasonName}
        </h2>
        {submissionsOpen && (
          <>
            <Link
              className="new-submission-button"
              to="submissions/new"
              style={{ backgroundColor: colors.primary }}
            >
              New
            </Link>
          </>
        )}
      </div>

      {submissionsOpen && (
        <h3 className="info-popup">Don't worry kitty gurl, you can view the submissions once the submitting window is closed</h3>
      )}

      {Object.keys(submissions) &&
        names.map((obj, i) => (
          <Submission
            key={`submission_${obj.name}`}
            seasonName={seasonName}
            submission={submissions[obj.name]}
            submittor={obj.name}
            score={obj.score}
            winner={i === 0 && finished}
            colors={colors}
            submissionsOpen={submissionsOpen}
          />
        ))}
    </>
  );
}

SubmissionList.propTypes = {
  seasonId: string,
  setSubmissions: func,
  submissions: object,
  seasonName: string,
  results: object,
  finished: bool,
  submissionsOpen: bool,
};
