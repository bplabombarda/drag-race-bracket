import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Submission from './Submission';
import getScore from '../../utils/getScore';
import { useSeasonsContext } from '../../context';

export default function SubmissionList({ submissions }) {
  const { seasonId } = useParams();
  const { seasonsList } = useSeasonsContext();
  const season = seasonsList[seasonId];

  const { primary, secondary, finished, results, seasonName, submissionsOpen } =
    season;
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
        colors={{ primary, secondary }}
        submissionsOpen={submissionsOpen}
      />
    ))
  );
}

const submissionShape = PropTypes.shape({});

SubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(submissionShape),
};
