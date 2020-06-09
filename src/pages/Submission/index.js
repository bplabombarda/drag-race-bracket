import React, { useState } from "react";
import { object, string, number, bool } from "prop-types";

import SubmissionWeeks from "Components/SubmissionWeeks";

import "./submission.scss";

export default function Submission({ seasonName, submittor, submission, score, winner }) {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  return (
    <div
      className={`submission ${winner ? "winner" : ""}`}
      onClick={toggleTrueFalse}
    >
      <span className="submitter-name">{submittor}</span>
      <span className="score">{score}</span>
      <SubmissionWeeks seasonName={seasonName} submission={submission} isShown={isToggled} />
    </div>
  );
}

Submission.propTypes = {
  seasonName: string,
  submission: object,
  submittor: string,
  score: number,
  winner: bool,
};
