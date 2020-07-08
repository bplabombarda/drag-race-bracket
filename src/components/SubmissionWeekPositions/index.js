import React from "react";
import { string, object } from "prop-types";

export default function SubmissionWeekPositions({
  seasonName,
  week,
  weekIndex,
  colors,
}) {
  const positionKeys = Object.keys(week);
  const finaleExtra =
    seasonName && seasonName.includes("stars") ? "Returning" : "Congeniality";

  return (
    <>
      <h2 style={{ color: colors.secondary }}>{` ${
        positionKeys.includes("congeniality")
          ? "Finale"
          : `${weekIndex.replace("top", "Top ")}` // plus 1 for index and the hardcoded 3 for the top 3
      }`}</h2>
      <ul>
        {positionKeys.reverse().map((position) => (
          <li key={position} className="position">
            <span style={{ color: colors.primary }}>{`${
              position === "congeniality" ? finaleExtra : position
            }:`}</span>
            <span style={{ color: colors.primary }}>
              {" "}
              {`${week[position]}`}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

SubmissionWeekPositions.propTypes = {
  seasonName: string,
  week: object,
  weekIndex: string,
};
