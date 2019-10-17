import React, { useState }  from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import './FormSelect.scss';

const FormSelect = ({ labelText, options, selectOption, type, ...rest }) => {
  
  const [ selectedValue, setValue ] = useState('');

  const handleChange = (event) => {
    const selectedOptionName = event.target.value;

    setValue(selectedOptionName);
    selectOption(type, selectedOptionName);
  }

  return (
    <label>{ labelText }
      <select
        onChange={ (event) => handleChange(event) }
        value={ selectedValue }
        { ...rest }>
        <option value='' disabled>Choose a Queen</option>
        {
          options.map(({ name }) => (
            <option
              key={ `option_${ name.split(' ').join('_') }` }
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
  labelText: string,
  options: arrayOf(
    shape({
      name: string,
      selected: bool,
    })
  ),
  selectOption: func,
  type:string,
};

export default FormSelect;
