import React from "react";
import { Link } from "@reach/router";
import { object } from "prop-types";

import "./seasonsList.scss";

export default function SeasonList({ seasons }) {
  return (
    <>
      <ul className="seasons-list">
        {Object.keys(seasons) &&
          Object.keys(seasons)
            .sort((a, b) => seasons[a].finished - seasons[b].finished)
            .map((seasonId) => (
              <li
                key={`season_${seasonId}`}
                style={{
                  border: seasons[seasonId].finished
                    ? `1px solid ${seasons[seasonId].primary}`
                    : `4px solid ${seasons[seasonId].primary}`,
                }}
              >
                <Link
                  style={{
                    color: `${seasons[seasonId].primary}`,
                    fontWeight: seasons[seasonId].finished ? "regular" : "bold",
                  }}
                  to={`seasons/${seasonId}`}
                >
                  {seasons[seasonId].name}
                </Link>
              </li>
            ))}
      </ul>
    </>
  );
}

SeasonList.propTypes = {
  seasons: object,
};
