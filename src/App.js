import React from 'react';
import { Router } from '@reach/router';

import Admin from 'Pages/Admin';
import Submissions from 'Pages/Submissions';
import Home from 'Pages/Home';

const App = () => (
  <Router>
    <Home path='/' />
    <Admin path='/admin/*' />
    <Submissions path='/submissions/*' />
  </Router>
);

export default App;
