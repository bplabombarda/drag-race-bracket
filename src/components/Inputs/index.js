import Select from "react-select";

import "./TextInput.scss";
import "./Select.scss";

export function TextInput({
  label,
  handleOnChange,
  type = "text",
  value,
  error,
}) {
  return (
    <div className={`text-input ${error ? "error" : ""}`}>
      <label>{label}: </label>
      <input
        required
        onChange={handleOnChange}
        type={type}
        value={value}
        maxLength={35}
      ></input>
    </div>
  );
}

export function SelectGroup({
  options,
  setSelections,
  sectionIndex,
  formState,
  validFields,
  showErrors = false,
}) {
  const handleOnChange = (event, type) => {
    const selectedOption = event.value;
    const selectedOptionType = type.name;

    selectOption(selectedOptionType, selectedOption);
  };

  const selectOption = (type, queenName) => {
    const sectionKey = `top${sectionIndex}`;

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
  const cache = cachedSelections[`top${sectionIndex}`] || {};

  return (
    <>
      <div
        className={`select-container ${
          !showErrors || validFields.winner ? "" : "error"
        }`}
      >
        <label>Winner: </label>
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
          value={options.filter((option) => option.value === cache.winner)}
        />
      </div>
      <div
        className={`select-container ${
          !showErrors || validFields.top ? "" : "error"
        }`}
      >
        <label>Top: </label>
        <Select
          required
          name="top"
          onChange={handleOnChange.bind("top")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "16px", padding: "0px 0px 18px" }),
          }}
          options={options}
          classNames={{ singleValue: () => "selected" }}
          value={options.filter((option) => option.value === cache.top)}
        />
      </div>
      <div
        className={`select-container ${
          !showErrors || validFields.bottom ? "" : "error"
        }`}
      >
        <label>Bottom: </label>
        <Select
          required
          name="bottom"
          onChange={handleOnChange.bind("bottom")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "16px", padding: "0px 0px 18px" }),
          }}
          options={options}
          classNames={{ singleValue: () => "selected" }}
          value={options.filter((option) => option.value === cache.bottom)}
        />
      </div>
      <div
        className={`select-container ${
          !showErrors || validFields.eliminated ? "" : "error"
        }`}
      >
        <label>Eliminated: </label>
        <Select
          required
          name="eliminated"
          onChange={handleOnChange.bind("eliminated")}
          isSearchable={false}
          styles={{
            placeholder: () => ({ fontSize: "16px", padding: "0px 0px 18px" }),
          }}
          options={options}
          classNames={{ singleValue: () => "selected" }}
          value={options.filter((option) => option.value === cache.eliminated)}
        />
      </div>
    </>
  );
}
