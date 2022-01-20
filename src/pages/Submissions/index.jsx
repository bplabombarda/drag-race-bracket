import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import SubmissionCreate from './SubmissionCreate';
import { useSeasonsContext } from '../../context';

export default function Submissions() {
  const { seasonId } = useParams();
  const { seasonsList } = useSeasonsContext();

  const season = seasonsList[seasonId] || {};

  return (
    <Routes>
      <Route index path="/new" element={<SubmissionCreate season={season} />} />
    </Routes>
  );
}
