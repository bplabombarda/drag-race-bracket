import React  from 'react';
import { arrayOf, bool, func, number, object, shape, string } from 'prop-types';

import FormSelect from 'Components/FormSelect';
import './FormSection.scss';

function FormSection ({ options, selections, sectionIndex, setSelections }) {
  
  const selectOption = (type, selectedOptionName) => {
    const selectedOption = options.find(({ name }) => {
      return name === selectedOptionName;
    });

    const newOptions = {
      ...selections,
      [sectionIndex]: {
        ...selections[sectionIndex],
        [type]: selectedOption,
      },
    }

    setSelections(newOptions);
  }

  return (
    <section>
      <FormSelect
        labelText='Choose a winner:'
        options={ options }
        selectOption={ selectOption }
        type='winner'
        />
      <FormSelect
        labelText='Choose a chantay you stay:'
        options={ options }
        selectOption={ selectOption }
        type='bottom'
        />
      <FormSelect
        labelText='Choose a sashay away:'
        options={ options }
        selectOption={ selectOption }
        type='eliminated'
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
  sectionIndex: number,
  selections: object,
  setSelections: func,
};

export default FormSection;
