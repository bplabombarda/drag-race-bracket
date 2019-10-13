import React  from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import FormSelect from 'Components/FormSelect';
import './FormSection.scss';

const FormSection = ({ options, setOptions }) => {

  const handleSelectOption = (selectedOptionName) => {

    const newOptions = options.map(option => {
      return option.name === selectedOptionName
        ? { ...option,  eliminated: true }
        : option
    });

    setOptions(newOptions);
  }

  return (
    <section>
      <FormSelect
        handleSelectOption={ handleSelectOption }
        labelText='Choose a winner:'
        options={ options }
        />
      <FormSelect
        handleSelectOption={ handleSelectOption }
        labelText='Choose a chantay you stay:'
        options={ options }
        />
      <FormSelect
        handleSelectOption={ handleSelectOption }
        labelText='Choose a sashay away:'
        options={ options }
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
  setOptions: func,
};

export default FormSection;
