import React, { useState }  from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import './FormSection.scss';

const FormSection = ({ handleSelectOption, options }) => {
  return (
    <section>

      <label> Choose a winner:
        <select name='winner' onChange={ (event) => handleSelectOption(event) }>
          {
            options.map(({ name }) => (
              <option key={ name } value={ name }>{ name }</option>
            ))
          }
        </select>
      </label>

      <label> Choose a chantay you stay:
        <select name='bottom' onChange={ (event) => handleSelectOption(event) }>
          {
            options.map(({ name }) => (
              <option key={ name } value={ name }>{ name }</option>
            ))
          }
        </select>
      </label>

      <label> Choose a sashay away:
        <select name='eliminated' onChange={ (event) => handleSelectOption(event) }>
          {
            options.map(({ name }) => (
              <option key={ name } value={ name }>{ name }</option>
            ))
          }
        </select>
      </label>

    </section>
  )
}

FormSection.propTypes = {
  handleSelectOption: func,
  options: arrayOf(
    shape({
      name: string,
      selected: bool,
    })
  ),
};

export default FormSection;
