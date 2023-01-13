import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Link from "../../components/Link"
import Score from "./Score"
import getScore from "../../utilities/getScore"
import "./Standings.scss";


export default function standings({ season, db }) {
  const [submissions, setSeason] = useState([]);

  async function fetchSubmissions(seasonId) {
    const submissionsRef = await db
      .collection("seasons")
      .doc(seasonId)
      .collection("submissions")
      .get();

    const submissionsData = submissionsRef.docs.map(doc => doc.data())
    const formattedSubmission = submissionsData
      .map((submission) => {
        return getScore(submission, season.results);
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });
    setSeason(formattedSubmission);
  }

  useEffect(() => {
    fetchSubmissions(season.seasonId);
  }, []);

  console.log("submissions", submissions);
  
  return (
    <Container heading="Standings">
      {submissions.map((sub, i) => (
        <div key={i} className="score-link-container">
          <Score score={sub.score} placement={i} />
          <Link path={`/submission/${sub.name}`} state={sub}>{sub.name}</Link>
        </div>
      ))}
    </Container>
  );
}
