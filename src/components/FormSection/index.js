import React  from 'react';
import { arrayOf, bool, func, shape, string, object } from 'prop-types';

import FormSelect from 'Components/FormSelect';
import './FormSection.scss';

function FormSection ({ options, selections, setSelections }) {
  
  const selectOption = (selectedOptionName) => {
    const newSelections = options.map(option => {
      return option.name === selectedOptionName
        ? { ...option,  eliminated: true }
        : option
    });


    setSelections(
      ...selections,
      newSelections,
    );
  }

  return (
    <section>
      <FormSelect
        options={ options }
        selectOption={ selectOption }
        text='Choose a winner:'
        />
      <FormSelect
        options={ options }
        selectOption={ selectOption }
        text='Choose a chantay you stay:'
        />
      <FormSelect
        options={ options }
        selectOption={ selectOption }
        text='Choose a sashay away:'
        />
    </section>
  )
}

FormSection.propTypes = {
  options: arrayOf(
    shape({
      name: string,
      selected: bool,
    })
  ),
  selections: object,
  setSelections: func,
};

export default FormSelect;
