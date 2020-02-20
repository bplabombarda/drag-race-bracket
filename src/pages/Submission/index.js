import React from 'react';

import SubmissionForm from 'Components/SubmissionForm';
import { object, string } from 'prop-types';

export default function Submission ({ path, seasonObject }) {
  const { queens, queensInFinale } = seasonObject;

  const getTitle = (path) => {
    const isEdit = path.endsWith('/edit');
    const isNew = path.endsWith('/new');

    if (isEdit) {
      return 'Edit Submission';
    }

    if (isNew) {
      return 'New Submission';
    }

    return 'Submission';
  }

  return (
    <>
      <h3>{ getTitle(path) }</h3>
      <SubmissionForm
        numberInFinal={ queensInFinale }
        options={ queens || [] }
      />
    </>
  );
}

Submission.propTypes = {
  path: string,
  seasonObject: object,
};
