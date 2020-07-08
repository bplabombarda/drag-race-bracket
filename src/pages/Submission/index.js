import React, { useState } from "react";
import { object, string, number, bool } from "prop-types";

import SubmissionWeeks from "Components/SubmissionWeeks";

import "./submission.scss";

export default function Submission({
  seasonName,
  submittor,
  submission,
  score,
  winner,
  colors,
}) {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  return (
    <div
      className={`submission ${winner ? "winner" : ""}`}
      onClick={toggleTrueFalse}
      style={{
        border: `2px solid ${colors.primary}`,
        backgroundColor: `${winner ? colors.primary : "none"}`,
      }}
    >
      <span
        className="submitter-name"
        style={{
          color: colors.primary,
          color: `${winner ? "white" : colors.primary}`,
        }}
      >
        {submittor}
      </span>
      <span className="score" style={{ backgroundColor: colors.secondary }}>
        {score}
      </span>
      <SubmissionWeeks
        seasonName={seasonName}
        submission={submission}
        isShown={isToggled}
        colors={colors}
      />
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
