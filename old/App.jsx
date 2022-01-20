import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import Layout from './pages/Layout';
import Season from './pages/Season';
import Seasons from './pages/Seasons';
import SubmissionCreate from './pages/SubmissionCreate';
import { getSeasons } from './utils/firestore';

export default function App() {
  const [seasons, setSeasons] = useState({});
  const [season, setSeason] = useState({});
  const { seasonId } = useParams();

  async function fetchSeasons() {
    const seasonsSnapshot = await getSeasons(true);
    setSeasons(seasonsSnapshot);
  }

  useEffect(() => {
    fetchSeasons();

    if (seasons[seasonId]) {
      setSeason(seasons[seasonId]);
    }
  }, [seasonId, seasons]);

  return (
    <Routes>
      <Route path="/seasons" element={<Layout />}>
        <Route index element={<Seasons seasons={seasons} />} />
        <Route path=":seasonId" element={<Season season={season} />} />
        <Route
          path=":seasonId/submission"
          element={<SubmissionCreate season={season} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/seasons" replace />} />
    </Routes>
  );
}
