import React, { useState } from "react";
import { object, string } from "prop-types";

import SubmissionWeeks from "Components/SubmissionWeeks";

import "./submission.scss";

export default function Submission({ submittor, submission }) {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  return (
    <div className="submission" onClick={toggleTrueFalse}>
      <div className="submitter-name">{submittor}</div>
      <SubmissionWeeks submission={submission} isShown={isToggled} />
    </div>
  );
}

Submission.propTypes = {
  submission: object,
  submittor: string
};
