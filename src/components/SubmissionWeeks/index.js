import React from 'react';
import { object } from 'prop-types';

import SubmissionWeekPositions from 'Components/SubmissionWeekPositions';

export default function SubmissionWeeks ({ submission }) {
  const weekKeys = Object.keys(submission);

  return (
    <ul>
      { weekKeys.map((week, index) => (
        <li key={ week } className='submissionWeek' >
          <SubmissionWeekPositions
            week={ submission[week] }
            weekIndex={ index }
            />
        </li>
      ))} 
    </ul>
  );
}

SubmissionWeeks.propTypes = {
  submission: object,
};
