import React from 'react';

import App from '../App';

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  it('renders', () => {
    const { asFragment } = wrapper;
    expect(asFragment()).toMatchSnapshot();
  });
});
