import React, { useState }  from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import './FormSelect.scss';

const FormSelect = ({ handleSelectOption, labelText, name, options }) => {
  const [ selectedValue, setValue ] = useState('')

  const handleChange = (event) => {
    const selectedOptionName = event.target.value

    setValue(selectedOptionName)
    handleSelectOption(selectedOptionName)
  }

  return (
    <label>{ labelText }
      <select
        name={ name }
        onChange={ (event) => handleChange(event) }>
        <option value='' selected disabled>Choose a queen</option>
        {
          options.map(({ eliminated, name }) => (
            <option
              hidden={ eliminated }
              key={ name }
              selected={ name === selectedValue }
              value={ name }>
              { name }
            </option>
          ))
        }
      </select>
    </label>
  );
}

FormSelect.propTypes = {
  handleSelectOption: func,
  labelText: string,
  name: string,
  options: arrayOf(
    shape({
      name: string,
      selected: bool,
    })
  ),
};

export default FormSelect;
