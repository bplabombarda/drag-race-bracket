import React, { useState } from 'react';
import { array, func, object, number } from 'prop-types';

import firebase from 'Utils/firebase';
import FormInput from 'Components/FormInput';
import SubmissionFormSection from './SubmissionFormSection';
import './SubmissionForm.scss';

const db = firebase.firestore();

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

export function getNumberOfSections (numberInFinal, options) {
  const delta = options.length - numberInFinal;
  const numOfSections = delta > 0 ? delta : 0;

  return [ ...Array(numOfSections).keys() ];
}

export function getSectionOptions (options, selections, sectionIndex) {
  const eliminated = getEliminatedQueens(selections, sectionIndex);

  return options.filter(option => !eliminated.includes(option));
}

export function addSubmission (seasonId, submission) {
  const collection = firebase.firestore().collection('seasons');
  const document = collection.doc(seasonId);
  const newSubmissionDocument = document.collection('submissions').doc();

  return firebase.firestore().runTransaction((transaction) => {
    return transaction.get(document).then(doc => {
      const data = doc.data();

      const newAverage =
          (data.numRatings * data.avgRating + rating.rating) /
          (data.numRatings + 1);

      transaction.update(document, {
        numRatings: data.numRatings + 1,
        avgRating: newAverage
      });
      return transaction.set(newSubmissionDocument, submission);
    });
  });
}

export default function SubmissionForm ({ numberInFinal, options }) {
  const [ formState, setFormState ] = useState({ email: '' , selections: {} });
  const numberOfSections = getNumberOfSections(numberInFinal, options);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO: Update submissions here.
  }

  const setEmail = event => {
    const { value: email } = event.target;

    setFormState({
      ...formState,
      email,
    });
  }

  const setSelections = selections => {
    setFormState({
      ...formState,
      selections,
    });
  }

  return (
    <form onSubmit={ handleSubmit }>
      <FormInput
        handleOnChange={ setEmail }
        labelText='Email: '
        name='email'
        type='text'
        value={ formState.email }
        />
      {
        numberOfSections.map((num) => (
          <SubmissionFormSection
            key={ `section_${ num }` }
            formState={ formState }
            options={ getSectionOptions(options, formState.selections, num) }
            sectionIndex={ num }
            setSelections={ setSelections }
            />
        ))
      }
      <FormInput
        handleOnChange={ () => null }
        labelText=''
        name='submit'
        type='submit'
        value='Submit'/>
    </form>
  );
}

SubmissionForm.propTypes = {
  numberInFinal: number,
  options: array,
  selections: object,
  setSelections: func,
};
