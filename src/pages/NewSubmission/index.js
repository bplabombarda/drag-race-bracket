import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import normalizeName from "../../utilities/normalizeName";
import { navigate } from "@reach/router";
import { SelectGroup } from "../../components/Inputs"
import FinaleSelectGroup from "../../components/Inputs/FinaleSelectGroup";
import Guide from "./Guide";
import Submit from "./Submit"
import PersonalInfo from "./PersonalInfo";
import "./NewSubmission.scss";

export const defaultObj = { name: "", venmo: "", email: "", selections: {} };

export default function NewSubmission({ season, addSubmission }) {

  if (localStorage.getItem("submitted") === season.seasonId) navigate("/thanks")
  
  const cachedData = JSON.parse(sessionStorage.getItem("formData"))
  const [formState, setFormState] = useState( cachedData || defaultObj);
  const [validFields, setErrorState] = useState({});

  const validate = (event) => {
    const { name, email, venmo, selections } = formState
    const { queens, queensInFinale } = season

    const keys = [...queens]
      .slice(queensInFinale, queens.length)
      .map((k, num) => k !== "finale" ? `top${queens.length - num}` : k)
    let showErrors = false
    const validSelections = keys.reduce((acc, key) => {
      const validSection =
        !!selections[key] &&
        !!selections[key].winner &&
        !!selections[key].top &&
        !!selections[key].bottom &&
        !!selections[key].eliminated; 
      showErrors = !validSection ? true : showErrors
      return {
        ...acc,
        [key]: {
          validSection,
          winner: !!selections[key] && !!selections[key].winner,
          top: !!selections[key] && !!selections[key].top,
          bottom: !!selections[key] && !!selections[key].bottom,
          eliminated: !!selections[key] && !!selections[key].eliminated,
        },
      };
    }, {})

    setErrorState({
      ...validFields,
      name: !!name,
      email: !!email,
      venmo: !!venmo,
      showErrors: showErrors || !name || !venmo || !email,
      selections: {
        ...validSelections,
        finale: {
          validSection:
            !!selections.finale &&
            !!selections.finale.winner &&
            !!selections.finale.runnerUp1 &&
            !!selections.finale.runnerUp2 &&
            !!selections.finale.congeniality,
          winner: !!selections.finale && !!selections.finale.winner,
          runnerUp1: !!selections.finale && !!selections.finale.runnerUp1,
          runnerUp2: !!selections.finale && !!selections.finale.runnerUp2,
          congeniality: !!selections.finale && !!selections.finale.congeniality,
        },
      },
    });
  } 

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formState));
   if (validFields.showErrors) {
     validate();
   }  }, [formState]);


  const setSelections = (selections) => {
      setFormState({
        ...formState,
        selections,
      })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addSubmission(season.seasonId, formState).then(() => {
      console.log("submission: ", formState);
      sessionStorage.removeItem("formData");
      localStorage.setItem("submitted", season.seasonId)
    });
    navigate(`/thanks`);
  };
  
  return (
    <>
      <Guide
        formState={formState}
        setFormState={setFormState}
        setErrorState={setErrorState}
        season={season}
      />
      <form id="new-submission" onSubmit={handleSubmit}>
        <PersonalInfo
          validFields={validFields}
          formState={formState}
          setFormState={setFormState}
          validate={validate}
        />
        {!formState.random && (
          <>
            {[...season.queens]
              .slice(season.queensInFinale, season.queens.length)
              .map((q, num) => (
                <Container
                  key={`Top ${season.queens.length - num}`}
                  heading={`Top ${season.queens.length - num}`}
                  className={`${
                    validFields.showErrors &&
                    !validFields.selections[`top${season.queens.length - num}`]
                      .validSection
                      ? "error"
                      : ""
                  }`}
                >
                  <SelectGroup
                    sectionIndex={season.queens.length - num}
                    setSelections={setSelections}
                    eliminated={getEliminatedQueens(formState.selections, num)}
                    eliminatedWeeks={createEliminatedDetailsObject(
                      formState.selections
                    )}
                    options={createOptionsArray(
                      season.queens,
                      formState.selections,
                      season.queens.length - num,
                      season.queensInFinale
                    )}
                    formState={formState}
                    validFields={
                      validFields.showErrors
                        ? validFields.selections[
                            `top${season.queens.length - num}`
                          ]
                        : {}
                    }
                    showErrors={validFields.showErrors}
                  />
                </Container>
              ))}

            <Container
              heading="Finale"
              className={`${
                validFields.showErrors &&
                !validFields.selections.finale.validSection
                  ? "error"
                  : ""
              }`}
            >
              <FinaleSelectGroup
                setSelections={setSelections}
                eliminated={getEliminatedQueens(formState.selections, "finale")}
                eliminatedWeeks={createEliminatedDetailsObject(
                  formState.selections
                )}
                options={createOptionsArray(
                  season.queens,
                  formState.selections,
                  season.queensInFinale,
                  season.queensInFinale
                )}
                allOptions={getAllOptions(
                  season.queens,
                  season.extraQueens,
                  formState.selections
                )}
                formState={formState}
                validFields={
                  validFields.showErrors ? validFields.selections.finale : {}
                }
                showErrors={validFields.showErrors}
              />
            </Container>
            {validFields.showErrors && (
              <div className="error-message">
                Make sure to fill out all the required fields kitty girl!
              </div>
            )}
            <Submit validate={validate} />
          </>
        )}
      </form>
    </>
  );
}


function getAllOptions(queens = [], extraQueens = []) { 
  return [...queens, ...extraQueens]
    .map((queen) => {
      const name = normalizeName(queen.name);

      const label = (
        <div
          className={`option-container`}
        >
          <img
            src={require(`../../assets/queens/circle/${name}.png`)}
            height="50px"
            width="50px"
          />
          {queen.name}
        </div>
      );
      return { value: name, label, required: true };
    })
}

function createOptionsArray(
  queens,
  selections,
  currentSection,
  queensInFinale
) {
  const eliminated = getEliminatedQueens(selections, currentSection);
  const eliminatedWeeks = createEliminatedDetailsObject(selections);

  return queens
    .map((queen) => {
      const name = normalizeName(queen.name);
      const alreadyEliminated =
        eliminated.includes(name) && eliminatedWeeks[name] >= currentSection;
      const alreadyChosen =
        (selections[`top${currentSection}`] &&
          (selections[`top${currentSection}`].winner === name ||
            selections[`top${currentSection}`].top === name ||
            selections[`top${currentSection}`].bottom === name ||
            selections[`top${currentSection}`].eliminated === name)) ||
        (selections.finale &&
          currentSection === queensInFinale &&
          (selections.finale.winner === name ||
            selections.finale.runnerUp1 === name ||
            selections.finale.runnerUp2 === name ||
            selections.finale.missCongeniality === name));

      const label = (
        <div
          className={`option-container ${
            alreadyEliminated
              ? "eliminated"
              : alreadyChosen
              ? "already-chosen"
              : ""
          }`}
        >
          <img
            src={require(`../../assets/queens/circle/${name}.png`)}
            height="50px"
            width="50px"
          />
          {queen.name}
        </div>
      );
      return {
        value: name,
        label,
        isDisabled: alreadyEliminated,
        required: true,
      };
    })
    .sort((x, y) => {
      const current =
        eliminated.includes(normalizeName(x.value)) &&
        eliminatedWeeks[normalizeName(x.value)] >= currentSection;

      const previous =
        eliminated.includes(normalizeName(y.value)) &&
        eliminatedWeeks[normalizeName(y.value)] >= currentSection;

      return current === previous ? 0 : current ? 1 : -1;
    });
}

function getEliminatedQueens(selections, sectionIndex) {
  createEliminatedDetailsObject(selections, sectionIndex);
  const weeks = Object.keys(selections);

  if (weeks.length > 0) {
    return weeks.map((week, index) => {
      return selections[week].eliminated;
    }, []);
  }

  return [];
}

function createEliminatedDetailsObject(selections) {
  return Object.keys(selections).reduce((obj, key) => {
    obj[selections[key].eliminated] = parseInt(key.replace("top", ""));
    return obj;
  }, {});
}
