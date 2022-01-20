import React from 'react';
import { Link } from 'react-router-dom';
import { bool, objectOf, shape, string } from 'prop-types';

import './seasons.scss';

export default function Seasons({ seasons }) {
  return (
    <ul className="seasons-list">
      {Object.keys(seasons) &&
        Object.keys(seasons)
          .sort((a, b) => seasons[a].finished - seasons[b].finished)
          .map(seasonId => (
            <li
              key={`season_${seasonId}`}
              style={{
                border: `4px solid ${seasons[seasonId].primary}`,
              }}
            >
              <Link
                style={{
                  color: `${
                    seasons[seasonId].finished
                      ? '#AFC4D8'
                      : seasons[seasonId].primary
                  }`,
                  fontWeight: seasons[seasonId].finished ? 'regular' : 'bold',
                }}
                to={`${seasonId}`}
              >
                {seasons[seasonId].name}
              </Link>
            </li>
          ))}
    </ul>
  );
}

const seasonShape = shape({
  finished: bool,
  primary: string,
});

Seasons.propTypes = {
  seasons: objectOf(seasonShape).isRequired,
};
