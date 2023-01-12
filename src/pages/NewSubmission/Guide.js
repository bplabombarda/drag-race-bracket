import React from "react"
import Container from "../../components/Container"
import { defaultObj } from "./index"
import { getRandomSelections } from "../../utilities/getRandomSelections";

const Guide = ({ formState, setFormState, season }) => {

    const clearState = () => {
        setFormState({
            ...defaultObj,
            selections: {},
        });
    };

      async function handleRandom() {
        clearState();
        const randomChoices = await getRandomSelections(season);
        setFormState({
          ...defaultObj,
          selections: { ...randomChoices },
          random: true,
        });
      }
  
  return (
    <Container heading="Guide">
      Go through each section below and select your Queens! All feilds are
      required, the form works best if you start at the top and go down but you
      can fill it out in any order you like.
      <br />
      <br />
      If you dont want to choose you can fill out your info and click
      "Randomize" and Dillcap will do it for you
      <div className="guide-buttons-container">
        <button onClick={clearState} className="pink-button guide-button">
          Clear Form
        </button>
        {formState.random ? (
          <button onClick={clearState} className="pink-button guide-button">
            Undo
          </button>
        ) : (
          <button onClick={handleRandom} className="pink-button guide-button">
            Randomize
          </button>
        )}
      </div>
    </Container>
  );
};

export default Guide