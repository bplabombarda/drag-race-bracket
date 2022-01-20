import React from 'react';
import { object } from 'prop-types';

import Submission from '../Submission';
import getScore from '../../utils/getScore';

export default function SubmissionList({ season, submissions }) {
  const { colors, finished, results, seasonName, submissionsOpen } = season;
  const emails = Object.keys(submissions)
    .map(email => {
      return getScore(email, submissions, results);
    })
    .sort((a, b) => {
      return b.score - a.score;
    });

  return (
    Object.keys(submissions) &&
    emails.map((obj, i) => (
      <Submission
        key={`submission_${obj.email}`}
        seasonName={seasonName}
        submission={submissions[obj.email]}
        submittor={obj.email}
        score={obj.score}
        winner={i === 0 && finished}
        colors={colors}
        submissionsOpen={submissionsOpen}
      />
    ))
  );
}

SubmissionList.propTypes = {
  season: object,
  submissions: object,
};
