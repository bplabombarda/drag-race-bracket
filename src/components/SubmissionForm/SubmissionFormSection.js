import React, { useState } from "react";
import { array, func, number, object } from "prop-types";

import FormSelect from "./SubmissionFormSelect";
import "./SubmissionFormSection.scss";

function FormSection({ formState, options, sectionIndex, setSelections }) {
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
    <section className={`week top-${sectionIndex} `}>
      <h1
        className={`title ${isToggled ? "arrow" : ""}`}
        onClick={toggleTrueFalse}
      >
        Top {sectionIndex}
      </h1>
      <div className={`form-container ${isToggled ? "active" : "inactive"}`}>
        <FormSelect
          labelText="Winner"
          name="winner"
          options={getInputOptions("winner")}
          selectOption={selectOption}
        />
        <FormSelect
          labelText="Top"
          name="eliminated"
          options={getInputOptions("top")}
          selectOption={selectOption}
        />
        <FormSelect
          labelText="Bottom"
          name="bottom"
          options={getInputOptions("bottom")}
          selectOption={selectOption}
        />
        <FormSelect
          labelText="Eliminated"
          name="eliminated"
          options={getInputOptions("eliminated")}
          selectOption={selectOption}
        />
      </div>
    </section>
  );
}

FormSection.propTypes = {
  formState: object,
  options: array,
  sectionIndex: number,
  setSelections: func
};

export default FormSection;
