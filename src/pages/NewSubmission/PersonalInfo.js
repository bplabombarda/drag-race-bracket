import React from "react"
import Container from "../../components/Container"
import { TextInput } from "../../components/Inputs";
import Submit from "./Submit";

const PersonalInfo = ({ formState, setFormState, validate, validFields }) => {
    
  const setName = (event) => {
    const { value: name } = event.target;
    setFormState({
      ...formState,
      name,
    });
  };

  const setVenmo = (event) => {
    const { value: venmo } = event.target;
    setFormState({
      ...formState,
      venmo,
    });
  };

  const setEmail = (event) => {
    const { value: email } = event.target;
    setFormState({
      ...formState,
      email,
    });
  };

    return (
      <Container
        heading={`${formState.random ? "Randomized: " : ""} Enter the Werkroom`}
        className={`${
          validFields.showErrors &&
          (!validFields.name ||
          !validFields.email ||
          !validFields.venmo) 
            ? "error"
            : ""
        }`}
      >
        <TextInput
          label="Name"
          handleOnChange={setName}
          value={formState.name}
          error={validFields.showErrors && !validFields.name}
        />
        <TextInput
          label="Email"
          handleOnChange={setEmail}
          value={formState.email}
          error={validFields.showErrors && !validFields.email}
          type="email"
        />
        <TextInput
          label="Venmo"
          handleOnChange={setVenmo}
          value={formState.venmo}
          error={validFields.showErrors && !validFields.venmo}
        />
        {formState.random && <Submit validate={validate} />}
      </Container>
    );
}

export default PersonalInfo