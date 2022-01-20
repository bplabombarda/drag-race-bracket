import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Season from './Season';
import SeasonList from './SeasonList';
import Submissions from '../Submissions';
import { useSeasonsContext } from '../../context';

export default function Seasons() {
  const { seasons, fetchSeasons } = useSeasonsContext();

  useEffect(() => {
    fetchSeasons();
  }, [fetchSeasons]);

  return (
    <Routes>
      <Route index path="/" element={<SeasonList seasons={seasons} />} />
      <Route path="/:seasonId/*" element={<Season />}>
        <Route path="submissions/*" element={<Submissions />} />
      </Route>
    </Routes>
  );
}
