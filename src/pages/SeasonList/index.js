import React from 'react';
import { Link } from '@reach/router';
import { object } from 'prop-types';

export default function SeasonList ({ seasons }) {
  return (
    <>
      <h2>Seasons:</h2>
      <ul>
        { Object.keys(seasons) &&
          Object.keys(seasons).map(seasonId => (
          <li key={ `season_${ seasonId }` } >
            <Link to={ `seasons/${ seasonId }` }>
              { seasonId }
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

SeasonList.propTypes = {
  seasons: object,
};
