import React, { useState } from "react";
import { array, func, number, object } from "prop-types";

import FormSelect from "./SubmissionFormSelect";
import "./SubmissionFormSection.scss";

export default function FormFinalSection({
  formState,
  options,
  sectionIndex,
  setSelections
}) {
  const getInputOptions = inputName => {
    const currentWeek = formState[sectionIndex] || {};
    const slots = Object.keys(currentWeek);
    const selectedThisWeek = slots.reduce((names, slot) => {
      const queen = currentWeek[slot] && currentWeek[slot].name;
      if (queen && slot !== inputName) names.push(queen);

      return names;
    }, []);

    return options.filter(({ name }) => !selectedThisWeek.includes(name));
  };

  const selectOption = (type, selectedOptionName) => {
    const selectedOption = options.find(name => {
      return name === selectedOptionName;
    });

    const sectionKey = `week${sectionIndex}`;

    const newSelections = {
      ...formState.selections,
      [sectionKey]: {
        ...formState.selections[sectionKey],
        [type]: selectedOption
      }
    };

    setSelections(newSelections);
  };

  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  return (
    <section className="week finale">
      <h1 onClick={toggleTrueFalse}>Finale</h1>
      <div className={`form-container ${isToggled ? "active" : "inactive"}`}>
        <FormSelect
          labelText="Winner"
          name="winner"
          options={getInputOptions("winner")}
          selectOption={selectOption}
        />
        <FormSelect
          labelText="Runner Up"
          name="runnerUp"
          options={getInputOptions("runnerUp")}
          selectOption={selectOption}
        />
        <FormSelect
          labelText="Runner up"
          name="runnerUp"
          options={getInputOptions("runnerUp")}
          selectOption={selectOption}
        />
        <FormSelect
          labelText="Miss Congeniality"
          name="congeniality"
          options={getInputOptions("eliminated")}
          selectOption={selectOption}
        />
      </div>
    </section>
  );
}

FormFinalSection.propTypes = {
  formState: object,
  options: array,
  sectionIndex: number,
  setSelections: func
};
