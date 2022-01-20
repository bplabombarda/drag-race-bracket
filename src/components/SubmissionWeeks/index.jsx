import React from 'react';
import { object, string, bool } from 'prop-types';

import SubmissionWeekPositions from '../SubmissionWeekPositions';

export default function SubmissionWeeks({
  seasonName,
  submission,
  isShown,
  colors,
}) {
  const weekKeys = Object.keys(submission).sort((a, b) => {
    return (
      parseInt(b.replace('top', '').replace('finale', '-100')) -
      parseInt(a.replace('top', '').replace('finale', '-100'))
    );
  });
  return (
    <ul className={`submission-weeks ${isShown ? 'active' : 'inactive'}`}>
      {weekKeys.reverse().map(week => (
        <li key={week} className="submissionWeek">
          <SubmissionWeekPositions
            seasonName={seasonName}
            week={submission[week]}
            weekIndex={week}
            colors={colors}
          />
        </li>
      ))}
    </ul>
  );
}

SubmissionWeeks.propTypes = {
  isShown: bool,
  seasonName: string,
  submission: object,
};
