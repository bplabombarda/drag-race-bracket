import React from 'react';
import { arrayOf, bool, func, object, shape, string, number } from 'prop-types';

import FormSection from 'Components/FormSection';
import './Form.scss';

export function getNumberOfSections (options) {
  // TODO: This should be a column on the `season` table
  const NUMBER_IN_FINAL = 3;

  const numOfSections = options.length - NUMBER_IN_FINAL;

  return [ ...Array(numOfSections).keys() ];
}

export function getSectionOptions (sectionIndex, options, selections) {
  const selectionKeys = Object.keys(selections);

  return selectionKeys
    ? selectionKeys.reduce((newOptions, key, keyIndex) => {
        if (keyIndex > sectionIndex) newOptions.push(selections[key]);
      }, [])
    : options;
}

export default function Form ({ options, selections, setSelections }) {
  const numberOfSections = getNumberOfSections(options);

  return (
    <form>
      {
        numberOfSections.map((index) => (
          <FormSection
            key={ `section_${ index }` }
            options={ getSectionOptions(index, options, selections) }
            selections={ selections }
            setSelections={ setSelections }
            />
        ))
      }
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
  selections: object,
  setSelections: func,
};
