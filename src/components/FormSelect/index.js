import React from "react";
import { array, func, string } from "prop-types";

export default function FormSelect(props) {
  const {
    className,
    handleOnChange,
    labelText,
    // multiple,
    name,
    optionDisplayProperty,
    options,
    value,
    ...rest
  } = props;

  return (
    <div className={name}>
      <label>{labelText}</label>
      <select name={name} onChange={handleOnChange} value={value} {...rest}>
        {options.map((option, index) => (
          <option key={`option_${index}`}>
            {option[optionDisplayProperty]}
          </option>
        ))}
      </select>
    </div>
  );
}

FormSelect.propTypes = {
  className: string,
  handleOnChange: func,
  labelText: string,
  // multiple: bool,
  optionDisplayProperty: string,
  options: array,
  name: string,
  value: array
};
