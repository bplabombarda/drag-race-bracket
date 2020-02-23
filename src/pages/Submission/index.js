import React from 'react';
import { object, string } from 'prop-types';

import SubmissionWeeks from 'Components/SubmissionWeeks';

export default function Submission ({ submittor, submission }) {
  return (
    <>
      <h3>{ submittor }</h3>
      <SubmissionWeeks
        submission={ submission }
        />
    </>
  );
}

Submission.propTypes = {
  submission: object,
  submittor: string,
};
