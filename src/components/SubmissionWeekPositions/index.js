import React from 'react';
import { number, object } from 'prop-types';

export default function SubmissionWeekPositions ({ week, weekIndex }) {
  const positionKeys = Object.keys(week);
  
  return (
    <>
      <h3>{ `Week ${ weekIndex + 1 }` }</h3>
      <ul>
        { positionKeys.map(position => (
          <li key={ position }>
          { `${ position }: ${ week[position] }` }
          </li>
        ))}
      </ul>
    </>
  );
}

SubmissionWeekPositions.propTypes = {
  week: object,
  weekIndex: number,
};
