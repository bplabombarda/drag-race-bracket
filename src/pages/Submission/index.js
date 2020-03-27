import React, { useState } from "react";
import { object, string } from "prop-types";

import SubmissionWeeks from "Components/SubmissionWeeks";

import "./submission.scss";

export default function Submission({ submittor, submission, score }) {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  return (
    <div className="submission" onClick={toggleTrueFalse}>
      <span className="submitter-name">{submittor}</span>
      <span className="score">{score}</span>
      <SubmissionWeeks submission={submission} isShown={isToggled} />
    </div>
  );
}

Submission.propTypes = {
  submission: object,
  submittor: string
};
