import React, { useState } from 'react';

import Form from 'Components/Form'
import './Edit.scss';

const defaultOptions = [
  { name: 'Baga Chipz', eliminated: false },
  { name: 'Blu Hydrangea', eliminated: false },
  { name: 'Cheryl Hole', eliminated: false },
  { name: 'Crystal', eliminated: false },
  { name: 'Divina de Campo', eliminated: false },
  { name: 'Gothy Kendoll', eliminated: false },
  { name: 'Scaredy Kat', eliminated: false },
  { name: 'Sum Ting Wong', eliminated: false },
  { name: 'The Vivienne', eliminated: false },
  { name: 'Vinegar Strokes', eliminated: false },
];

const Edit = () => {
  const [ options, setOptions ] = useState(defaultOptions);

  return (
    <>
      <h1>Edit your picks:</h1>
      <Form options={ options } setOptions={ setOptions }/>
    </>
  );
}

export default Edit;
