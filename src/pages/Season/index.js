import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import { object, string } from "prop-types";

import firebase from "Utils/firebase";
import Submission from "Pages/Submission";
import SubmissionNew from "Pages/SubmissionNew";
import SubmissionList from "Pages/SubmissionList";

const db = firebase.firestore();

export async function addSubmission(season, { email, selections }) {
  try {
    await db
      .collection("seasons")
      .doc(season)
      .collection("submissions")
      .doc(email)
      .set(selections);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not add submission.: ${error}`);
  }
}

export async function fetchSubmissions(seasonId) {
  const submissions = await db
    .collection("seasons")
    .doc(seasonId)
    .collection("submissions")
    .get();

  return await submissions;
}

export default function Season({ seasonId, seasons }) {
  const [season, setSeason] = useState({ name: "" });
  const [submissions, setSubmissions] = useState({});
  useEffect(() => {
    setSeason(seasons[seasonId] || {});
  }, []);

  return (
    <>
      <Router>
        <SubmissionList
          path="/"
          setSubmissions={setSubmissions}
          submissions={submissions}
          seasonName={season.name}
          results={season.results}
        />
        {/* <Submission
          path='submissions/edit'
          addSubmission={ addSubmission }
          seasonObject={ season }/> */}
        <SubmissionNew
          path="submissions/new"
          addSubmission={addSubmission}
          seasonObject={season}
        />
      </Router>
    </>
  );
}

Season.propTypes = {
  seasons: object,
  seasonId: string
};
