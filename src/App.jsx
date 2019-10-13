import React from 'react';
import { hot } from 'react-hot-loader/root'

import Home from 'Pages/Home';

export class App extends React.PureComponent {
  render () {
    return (
      <Home />
    );
  }
}

export default hot(App);
