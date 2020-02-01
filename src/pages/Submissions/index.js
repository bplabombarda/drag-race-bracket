import React from 'react';
import { Link, Router } from '@reach/router';

import SubmissionForm from 'Components/SubmissionForm';
import './Submissions.scss';

export default function Edit () {
  return (
    <>
      <h2>Submission Section</h2>
      <nav>
        <Link to=''>View</Link>{' '}
        <Link to='new'>Create</Link>
      </nav>
      <Router>
        <SubmissionForm path='new'/>
      </Router>
    </>
  );
}
