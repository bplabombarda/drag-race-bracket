import React from 'react';
import { func, number, oneOfType, string } from 'prop-types';

export default function FormInput(props) {
  const {
    className,
    handleOnChange,
    labelText,
    name,
    type,
    value,
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
