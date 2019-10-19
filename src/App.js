import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Router } from "@reach/router"

import Edit from 'Pages/Edit';
import Home from 'Pages/Home';

const App = () => (
  <Router>
    <Home path="/" />
    <Edit path="edit" />
  </Router>
);

export default hot(App);
