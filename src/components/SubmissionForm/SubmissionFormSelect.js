import React, { useState }  from 'react';
import { arrayOf, func, string } from 'prop-types';

import './SubmissionFormSelect.scss';

const SubmissionFormSelect = ({ labelText, options, selectOption, ...rest }) => {
  
  const [ selectedValue, setValue ] = useState('');

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    const selectedOptionType = event.target.name;

    setValue(selectedOption);
    selectOption(
      selectedOptionType,
      selectedOption,
    );
  }

  return (
    <label>{ labelText }
      <select
        onChange={ (event) => handleChange(event) }
        value={ selectedValue }
        { ...rest }>
        <option value=''>Choose a Queen</option>
        {
          options.map(optionName => (
            <option
              key={ `option_${ optionName.split(' ').join('_') }` }
              value={ optionName }>
              { optionName }
            </option>
          ))
        }
      </select>
    </label>
  );
}

SubmissionFormSelect.propTypes = {
  labelText: string,
  options: arrayOf(string),
  selectOption: func,
  type:string,
};

export default SubmissionFormSelect;
