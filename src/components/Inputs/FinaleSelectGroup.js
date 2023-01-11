import React, {useState, useEffect} from "react";
import Select from "react-select";

import "./TextInput.scss";
import "./Select.scss";



export default function FinaleSelectGroup({
  options,
  allOptions,
  setSelections,
  sectionIndex,
  formState,
}) {
  const handleOnChange = (event, type) => {
    const selectedOption = event.value;
    const selectedOptionType = type.name;

    selectOption(selectedOptionType, selectedOption);
  };

  const selectOption = (type, queenName) => {

    const sectionKey = sectionIndex === -1 ? "finale" : `top${sectionIndex}`;

    const newSelections = {
      ...formState.selections,
      [sectionKey]: {
        ...formState.selections[sectionKey],
        [type]: queenName,
      },
    };

    setSelections(newSelections);
  };

  return (
    <>
      <div className="select-container finale">
        <label>Winner</label>
        <Select
        required
          name="winner"
          onChange={handleOnChange.bind("winner")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "18px", padding: "0px 0px 18px" }),
          }}
          options={options}
        />
      </div>
      <div className="select-container">
        <label>Runner Up</label>
        <Select
        required
          name="runnerUp1"
          onChange={handleOnChange.bind("runnerUp1")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "18px", padding: "0px 0px 18px" }),
          }}
          options={options}
        />
      </div>
      <div className="select-container">
        <label>Runner Up</label>
        <Select
        required
          name="runnerUp2"
          onChange={handleOnChange.bind("runnerUp2")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "18px", padding: "0px 0px 18px" }),
          }}
          options={options}
        />
      </div>
      <div className="select-container">
        <label>Miss Congeniality</label>
        <Select
        required
          name="missCongeniality"
          onChange={handleOnChange.bind("missCongeniality")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "18px", padding: "0px 0px 18px" }),
          }}
          options={allOptions}
        />
      </div>
    </>
  );
}