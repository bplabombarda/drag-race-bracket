import React from 'react';
import { Link, Router } from '@reach/router';

import Queens from 'Components/Queens';
import Seasons from 'Components/Seasons';

export default function Admin () {
  return (
    <>
      <nav>
        <Link to='queens'>Add Queen</Link>{' '}
        <Link to='seasons'>Add Season</Link>
      </nav>
      <Router>
        <Queens path='/queens' />
        <Seasons path='/seasons' />
      </Router>
    </>
  );
}
