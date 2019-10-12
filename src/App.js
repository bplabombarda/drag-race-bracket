import React from 'react';
import { hot } from 'react-hot-loader/root'

import Home from 'Pages/Home';
import 'Styles/index.scss';

export class App extends React.PureComponent {
  render () {
    return (
      <Home />
    );
  }
}

export default hot(App);
