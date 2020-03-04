import React from "react";
import { Link } from "@reach/router";
import { object } from "prop-types";

import "./seasonsList.scss";

export default function SeasonList({ seasons }) {
  return (
    <>
      <ul className="seasons-list">
        {Object.keys(seasons) &&
          Object.keys(seasons).map(seasonId => (
            <li key={`season_${seasonId}`}>
              <Link to={`seasons/${seasonId}`}>{seasons[seasonId].name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}

SeasonList.propTypes = {
  seasons: object
};
