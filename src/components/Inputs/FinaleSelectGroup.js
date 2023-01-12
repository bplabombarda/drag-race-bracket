import React, {useState, useEffect} from "react";
import Select from "react-select";

import "./TextInput.scss";
import "./Select.scss";

export default function FinaleSelectGroup({
  options,
  allOptions,
  setSelections,
  formState,
}) {
  const handleOnChange = (event, type) => {
    const selectedOption = event.value;
    const selectedOptionType = type.name;

    selectOption(selectedOptionType, selectedOption);
  };

  const selectOption = (type, queenName) => {
    const sectionKey = "finale"

    const newSelections = {
      ...formState.selections,
      [sectionKey]: {
        ...formState.selections[sectionKey],
        [type]: queenName,
      },
    };

    setSelections(newSelections);
  };

  const cachedSelections = formState.selections || {};
  const cache = cachedSelections.finale || {};

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
            placeholder: () => ({ fontSize: "16px", padding: "0px 0px 18px" }),
          }}
          options={options}
          classNames={{ singleValue: () => "selected" }}
          value={options.filter(
            (option) => option.value === cache.winner
          )}
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
          classNames={{ singleValue: () => "selected" }}
          value={options.filter(
            (option) => option.value === cache.runnerUp1
          )}
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
          classNames={{ singleValue: () => "selected" }}
          value={options.filter(
            (option) => option.value === cache.runnerUp2
          )}
        />
      </div>
      <div className="select-container">
        <label>Miss Congeniality</label>
        <Select
          required
          name="congeniality"
          onChange={handleOnChange.bind("congeniality")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "18px", padding: "0px 0px 18px" }),
          }}
          options={allOptions}
          classNames={{ singleValue: () => "selected" }}
          value={allOptions.filter(
            (option) => option.value === cache.congeniality
          )}
        />
      </div>
    </>
  );
}