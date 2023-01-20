import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import Container from "../../components/Container";
import Link from "../../components/Link"
import Placement from "./Placement"
import getScore from "../../utilities/getScore"
import "./Standings.scss";


export default function standings({ season, db }) {
  if (season.submissionsOpen) navigate("/");
  
  const [submissions, setSeason] = useState([]);
  const [isScore, setScore] = useState(true);

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

  let placement = 1
  let isLastPlace = false
  let isTie = false;

  return (
  <>
    {(season.message && season.message.length > 0) && (
      <Container heading="Message From Staff">
          {season.message}
      </Container>
    )}
    <Container heading="Standings">
      <div className="prize">
        &#128176; Grand Prize - ${submissions.length * 20 * 0.5} &#128176;
      </div>
      <div className="last-updated">(scores as of {season.lastUpdated})</div>
      {submissions.map((sub, i) => {
        if (i > 0 && submissions[i - 1].score !== sub.score) {
          placement = i + 1;
          isTie = false;
        } else if (placement === 1 && submissions.length === i + 1 && isScore) {
          setScore(false)
        } else if (placement === 1 && submissions[i + 1] && submissions[i + 1].score === sub.score) {
          isTie = true;
        }

        if (sub.score === submissions[submissions.length - 1].score)
          isLastPlace = true;
        console.log('isScore', isScore)
        return (
          <div key={i} className="placement-link-container">
            {isScore && (
              <Placement
              placement={!isLastPlace ? placement : submissions.length}
              isLastPlace={isLastPlace}
              isTie={isTie}
              />
            )}
            <Link path={`/submission/${sub.name}`} state={sub}>
              {sub.name} - <strong>{sub.score}</strong>
            </Link>
          </div>
        );
      })}
      </Container>
      </>
  );
}
