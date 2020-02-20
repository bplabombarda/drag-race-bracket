import React, { useState } from 'react';
import { Link } from '@reach/router';
import { arrayOf, object } from 'prop-types';

export default function SeasonList ({ seasons }) {
  const getSeasonObject = (currentUrl) => {
    return seasons.find(({ url }) => url === currentUrl);
  }

  return (
    <>
      <h2>Seasons:</h2>
      <ul>
        { seasons.map(({ name, url }, index) => (
          <li key={ `season_${ index }` } >
            <Link
              state={{ season: getSeasonObject(url) }}
              to={ `seasons/${ url }` }>
              { name }
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

SeasonList.propTypes = {
  seasons: arrayOf(object),
};
