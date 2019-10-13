import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import FormSection from 'Components/FormSection';

const Form = ({ options, setOptions }) => {
  return (
    <form>
      <FormSection
        setOptions={ setOptions }
        options={ options }
        />
      <FormSection
        setOptions={ setOptions }
        options={ options }
        />
      <FormSection
        setOptions={ setOptions }
        options={ options }
        />
      <FormSection
        setOptions={ setOptions }
        options={ options }
        />
      <FormSection
        setOptions={ setOptions }
        options={ options }
        />  
    </form>
  );
}

Form.propTypes = {
  options: arrayOf(
    shape({
      name: string,
      eliminated: bool,
    })
  ),
  setOptions: func,
};

export default Form;
