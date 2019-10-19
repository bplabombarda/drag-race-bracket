import React from 'react';
import { arrayOf, bool, func, object, shape, string } from 'prop-types';

import FormSection from 'Components/FormSection';
import './Form.scss';

export function getEliminatedQueens (selections, sectionIndex) {
    const weeks = Object.keys(selections);
  
    if (weeks.length > 0) {
      return weeks.reduce((acc, week, index) => {
        const elim = selections[week].eliminated
          ? selections[week].eliminated.name
          : null;

        if ((elim) && (index !== sectionIndex)) {
          acc.push(elim);
        }

        return acc;
      }, []);
    }

    return [];
}

export function getNumberOfSections (options) {
  // TODO: This should be a column on the `season` table
  const NUMBER_IN_FINAL = 3;

  const numOfSections = options.length - NUMBER_IN_FINAL;

  return [ ...Array(numOfSections).keys() ];
}

export function getSectionOptions (options, selections, sectionIndex) {
  const eliminated = getEliminatedQueens(selections, sectionIndex);

  return options.filter(({ name }) => !eliminated.includes(name));
}

export default function Form ({ options, selections, setSelections }) {
  const numberOfSections = getNumberOfSections(options);

  return (
    <form>
      {
        numberOfSections.map((index) => (
          <FormSection
            key={ `section_${ index + 1 }` }
            options={ getSectionOptions(options, selections, index) }
            selections={ selections }
            sectionIndex={ index }
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
