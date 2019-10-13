import React, { useState } from 'react';

import FormSection from 'Components/FormSection';

const defaultOptions = [
  { name: 'One', selected: false },
  { name: 'Two', selected: false },
  { name: 'Three', selected: false },
  { name: 'Four', selected: false },
  { name: 'Five', selected: false },
  { name: 'Six', selected: false },
  { name: 'Seven', selected: false },
  { name: 'Eight', selected: false }
];

const Form = (props) => {
  const [ options, updateOptions ] = useState(defaultOptions);

  function handleSelectOption (event) {
    const selectedOption = event.target.value;

    const newOptions = options.map((option) => {
      return option.name === selectedOption
        ? { ...option, selected: true }
        : { ...option }
    });

    updateOptions(newOptions)
    console.log(newOptions)
  }

  return (
    <form>
      <FormSection
        handleSelectOption={() => null}
        options={ defaultOptions }
        />
    </form>
  );
}

// Form.propTypes = {
//   handleSelectOption: func,
//   options: arrayOf(
//     shape({
//       name: string,
//       selected: bool,
//     })
//   ),
// };

export default Form
