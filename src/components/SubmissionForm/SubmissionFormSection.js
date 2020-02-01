import React  from 'react';
import { arrayOf, bool, func, number, object, shape, string } from 'prop-types';

import FormSelect from './SubmissionFormSelect';
import './SubmissionFormSection.scss';

function FormSection ({ options, selections, sectionIndex, setSelections }) {

  const getInputOptions = (inputName) => {
    const currentWeek = selections[sectionIndex]  || {};
    const slots = Object.keys(currentWeek);
    const selectedThisWeek = slots.reduce((names, slot) => {
      const queen = currentWeek[slot] && currentWeek[slot].name;
      if (queen && slot !== inputName) names.push(queen);

      return names;
    }, []);

    return options.filter(({ name }) => !selectedThisWeek.includes(name));
  }

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
        name='winner'
        options={ getInputOptions('winner') }
        selectOption={ selectOption }
        />
      <FormSelect
        labelText='Choose a chantay you stay:'
        name='bottom'
        options={ getInputOptions('bottom') }
        selectOption={ selectOption }
        />
      <FormSelect
        labelText='Choose a sashay away:'
        name='eliminated'
        options={ getInputOptions('eliminated') }
        selectOption={ selectOption }
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
