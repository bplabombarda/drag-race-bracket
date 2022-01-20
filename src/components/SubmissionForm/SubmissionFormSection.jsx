import React, { useState } from "react";
import { array, func, number, object } from "prop-types";

import FormSelect from "./SubmissionFormSelect";
import "./SubmissionFormSection.scss";

function FormSection({
  formState,
  options,
  sectionIndex,
  setSelections,
  eliminated,
  colors,
}) {
  const getInputOptions = (inputName) => {
    const currentWeek = formState[sectionIndex] || {};
    const slots = Object.keys(currentWeek);

    const selectedThisWeek = slots.reduce((names, slot) => {
      const queen = currentWeek[slot] && currentWeek[slot].name;
      if (queen && slot !== inputName) names.push(queen);
      return names;
    }, []);

    return options.filter(({ name }) => {
      return !selectedThisWeek.includes(name);
    });
  };

  const selectOption = (type, selectedOptionName) => {
    const selectedOption = options.find((name) => {
      return name === selectedOptionName;
    });

    const sectionKey = `top${sectionIndex}`;

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

  return (
    <section
      className={`week top-${sectionIndex} `}
      style={{ border: ` 2px solid ${colors.primary}` }}
    >
      <h1
        className={`title ${isToggled ? "arrow" : ""}`}
        onClick={toggleTrueFalse}
        style={{ backgroundColor: colors.primary }}
      >
        Top {sectionIndex}
      </h1>
      <div className={`form-container ${isToggled ? "active" : "inactive"}`}>
        <FormSelect
          labelText="Winner"
          name="winner"
          options={getInputOptions("winner")}
          selectOption={selectOption}
          eliminated={eliminated}
          colors={colors}
        />
        <FormSelect
          labelText="Top"
          name="top"
          options={getInputOptions("top")}
          selectOption={selectOption}
          eliminated={eliminated}
          colors={colors}
        />
        <FormSelect
          labelText="Bottom"
          name="bottom"
          options={getInputOptions("bottom")}
          selectOption={selectOption}
          eliminated={eliminated}
          colors={colors}
        />
        <FormSelect
          labelText="Eliminated"
          name="eliminated"
          options={getInputOptions("eliminated")}
          selectOption={selectOption}
          eliminated={eliminated}
          colors={colors}
        />
      </div>
    </section>
  );
}

FormSection.propTypes = {
  formState: object,
  options: array,
  sectionIndex: number,
  setSelections: func,
  eliminated: array,
};

export default FormSection;
