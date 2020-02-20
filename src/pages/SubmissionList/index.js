import React from 'react';
import { array } from 'prop-types';

export default function SubmissionList ({ submissions }) {
  return (
    <ul>
      { Object.keys(submissions) &&
        Object.keys(submissions).map((key, index) => (
        <li key={ `submission_${index}` }>
          { key } 
        </li>
      ))}
    </ul>
  );
}

SubmissionList.propTypes = {
  submissions: array,
};
