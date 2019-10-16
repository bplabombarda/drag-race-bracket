import React, { useState }  from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import './FormSelect.scss';

function FormSelect ({ selectOption, options, text, ...rest }) {
  
  const [ selectedValue, setValue ] = useState('');

  const handleChange = (event) => {
    const selectedOptionName = event.target.value;

    setValue(selectedOptionName);
    selectOption(selectedOptionName);
  }

  return (
    <label>{ text }
      <select
        onChange={ (event) => handleChange(event) }
        { ...rest }>
        <option value='' selected disabled>Choose a queen</option>
        {
          options.map(({ name }) => (
            <option
              key={ `option_${ name }` }
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
  options: arrayOf(
    shape({
      name: string,
      selected: bool,
    })
  ),
  selectOption: func,
  text: string,
};

export default FormSelect;
