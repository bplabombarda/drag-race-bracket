import React from 'react';
import { func, number, oneOfType, string } from 'prop-types';

export default function FormInput (props) {
  const {
    className,
    handleOnChange,
    labelText, 
    name, 
    type,
    value,
    ...rest
  } = props;

  return (
    <div className={ className }>
      <label>{ labelText }</label>
      <input
        name={ name }
        onChange={ handleOnChange }
        type={ type }
        value={ value }
        { ...rest }
        />
    </div>
  );
}

FormInput.propTypes = {
  className: string,
  handleOnChange: func,
  labelText: string,
  name: string,
  type: string,
  value: oneOfType([ number, string ]),
};
