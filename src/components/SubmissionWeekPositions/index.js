import React from "react";
import { number, object } from "prop-types";

export default function SubmissionWeekPositions({ week, weekIndex }) {
  const positionKeys = Object.keys(week);

  return (
    <>
      <h2>{` ${
        positionKeys.includes("congeniality")
          ? "Finale"
          : "Top " + (weekIndex + 4) // plus 1 for index and the hardcoded 3 for the top 3
      }`}</h2>
      <ul>
        {positionKeys.reverse().map(position => (
          <li key={position} className="position">
            <span>{`${position}:`}</span>
            <span> {`${week[position]}`}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

SubmissionWeekPositions.propTypes = {
  week: object,
  weekIndex: number
};
