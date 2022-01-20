import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Seasons from './pages/Seasons';
import { SeasonsProvider } from './context';

export default function App() {
  return (
    <SeasonsProvider>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route path="seasons/*" element={<Seasons />} />
        </Route>
      </Routes>
    </SeasonsProvider>
  );
}
