import React from 'react';
import { func, number, oneOfType, string } from 'prop-types';

export default function FormInput(props) {
  const {
    handleOnChange,
    labelText,
    name,
    type,
    value,
    required,
    colors,
    ...rest
  } = props;

  return (
    <div className={type.toLowerCase()}>
      <input
        name={name}
        onChange={handleOnChange}
        type={type}
        value={value}
        placeholder={labelText}
        required={required}
        style={{
          border: `2px solid ${colors.primary}`,
          backgroundColor: `${
            type.toLowerCase() === 'submit' ? colors.primary : ''
          }`,
        }}
        {...rest}
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
  value: oneOfType([number, string]),
};
