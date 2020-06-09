import React, { useState } from "react";
import { array, func, number, object, string, bool } from "prop-types";

import FormSelect from "./SubmissionFormSelect";
import "./SubmissionFormSection.scss";

export default function FormFinalSection({
  formState,
  options,
  sectionIndex,
  setSelections,
  name,
  eliminated,
  extraOptions,
}) {
  const getInputOptions = (inputName) => {
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
    const selectedOption = options.find((name) => {
      return name === selectedOptionName;
    });

    const sectionKey = `finale`;

    const newSelections = {
      ...formState.selections,
      [sectionKey]: {
        ...formState.selections[sectionKey],
        [type]: selectedOption,
      },
    };

    setSelections(newSelections);
  };

  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);
  const finaleExtra =
    name && name.includes("stars")
      ? "Who will return this season"
      : "Miss Congeniality";

  const finaleExtraOptions = [
    ...extraOptions,
    ...getInputOptions("eliminated"),
  ];

  return (
    <section className="week finale">
      <h1 onClick={toggleTrueFalse}>Finale</h1>
      <div className={`form-container ${isToggled ? "active" : "inactive"}`}>
        <FormSelect
          labelText="Winner"
          name="winner"
          options={getInputOptions("winner")}
          selectOption={selectOption}
          eliminated={eliminated}
        />
        <FormSelect
          labelText="Runner Up"
          name="runnerUp1"
          options={getInputOptions("runnerUp")}
          selectOption={selectOption}
          eliminated={eliminated}
        />
        <FormSelect
          labelText="Runner up"
          name="runnerUp2"
          options={getInputOptions("runnerUp")}
          selectOption={selectOption}
          eliminated={eliminated}
        />
        <FormSelect
          labelText={`${finaleExtra}`}
          name="congeniality"
          options={finaleExtraOptions}
          selectOption={selectOption}
          eliminated={eliminated}
        />
      </div>
    </section>
  );
}

FormFinalSection.propTypes = {
  formState: object,
  options: array,
  sectionIndex: number,
  setSelections: func,
  name: string,
  eliminated: array,
  extraOptions: array,
};
