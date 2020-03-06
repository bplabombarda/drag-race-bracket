import React from "react";
import { object } from "prop-types";

import SubmissionWeekPositions from "Components/SubmissionWeekPositions";

export default function SubmissionWeeks({ submission, isShown }) {
  const weekKeys = Object.keys(submission).sort((a, b) => {
    return (
      parseInt(b.replace("top", "").replace("finale", "-100")) -
      parseInt(a.replace("top", "").replace("finale", "-100"))
    );
  });
  return (
    <ul className={`submission-weeks ${isShown ? "active" : "inactive"}`}>
      {weekKeys.reverse().map((week, index) => (
        <li key={week} className="submissionWeek">
          <SubmissionWeekPositions week={submission[week]} weekIndex={week} />
        </li>
      ))}
    </ul>
  );
}

SubmissionWeeks.propTypes = {
  submission: object
};
