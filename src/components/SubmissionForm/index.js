import React, { useState, Fragment } from "react";
import { array, func, object, number, string } from "prop-types";
import { navigate } from "@reach/router";
import FormInput from "Components/FormInput";
import SubmissionFormSection from "./SubmissionFormSection";
import SubmissionFormFinalSection from "./SubmissionFormFinalSection";
import "./SubmissionForm.scss";

export function getEliminatedQueens(selections, sectionIndex) {
  const weeks = Object.keys(selections);

  if (weeks.length > 0) {
    return weeks.reduce((acc, week, index) => {
      const elim = selections[week].eliminated
        ? selections[week].eliminated.name
        : null;

      if (elim && index !== sectionIndex) {
        acc.push(elim);
      }

      return acc;
    }, []);
  }

  return [];
}

export function getNumberOfSections(numberInFinal, options) {
  const delta = options.length - numberInFinal;
  const numOfSections = delta > 0 ? delta : 0;
  return [...Array(numOfSections).keys()];
}

export function getSectionOptions(options, selections, sectionIndex) {
  const eliminated = getEliminatedQueens(selections, sectionIndex);

  return options.filter(option => !eliminated.includes(option));
}

export default function SubmissionForm({
  addSubmission,
  numberInFinal,
  options,
  seasonId
}) {
  const [formState, setFormState] = useState({ email: "", selections: {} });
  const numberOfSections = getNumberOfSections(numberInFinal, options);
  const handleSubmit = async event => {
    event.preventDefault();
    addSubmission(seasonId, formState);
    navigate(`/seasons/${seasonId}`);
  };

  const setEmail = event => {
    const { value: email } = event.target;

    setFormState({
      ...formState,
      email
    });
  };

  const setSelections = selections => {
    setFormState({
      ...formState,
      selections
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        handleOnChange={setEmail}
        labelText="Email: "
        name="email"
        type="text"
        value={formState.email}
      />
      {numberOfSections.reverse().map(num => {
        // If it is the last week, render the Final section.
        return (
          <Fragment key={`section_${num}`}>
            <SubmissionFormSection
              formState={formState}
              options={getSectionOptions(options, formState.selections, num)}
              sectionIndex={num + 1 + numberInFinal}
              setSelections={setSelections}
            />

            {num === 0 && (
              <SubmissionFormFinalSection
                key={`section_${num}_finale`}
                formState={formState}
                options={getSectionOptions(options, formState.selections, num)}
                sectionIndex={num}
                setSelections={setSelections}
              />
            )}
          </Fragment>
        );
      })}
      <FormInput
        handleOnChange={() => null}
        labelText=""
        name="submit"
        type="submit"
        value="Submit"
      />
    </form>
  );
}

SubmissionForm.propTypes = {
  addSubmission: func,
  numberInFinal: number,
  options: array,
  seasonId: string,
  selections: object,
  setSelections: func
};
