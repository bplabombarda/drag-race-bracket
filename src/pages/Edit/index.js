import React, { useState } from 'react';

import Form from 'Components/Form'
import './Edit.scss';

const options = [
  { name: 'Baga Chipz' },
  { name: 'Blu Hydrangea' },
  { name: 'Cheryl Hole' },
  { name: 'Crystal' },
  { name: 'Divina de Campo' },
  { name: 'Gothy Kendoll' },
  { name: 'Scaredy Kat' },
  { name: 'Sum Ting Wong' },
  { name: 'The Vivienne' },
  { name: 'Vinegar Strokes' },
];

export default function Edit () {
  const [ selections, setSelections ] = useState({});

  return (
    <>
      <h1>Edit your picks:</h1>
      <Form
        options={ options }
        selections={ selections }
        setSelections={ setSelections }/>
    </>
  );
}
