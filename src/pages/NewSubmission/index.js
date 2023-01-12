import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import normalizeName from "../../utilities/normalizeName";
import { navigate } from "@reach/router";
import { SelectGroup } from "../../components/Inputs"
import FinaleSelectGroup from "../../components/Inputs/FinaleSelectGroup";
import Guide from "./Guide";
import PersonalInfo from "./PersonalInfo";
import "./NewSubmission.scss";

export const defaultObj = { name: "", venmo: "", email: "", selections: {} };

export default function NewSubmission({ season, addSubmission }) {

  if (localStorage.getItem("submitted") === season.seasonId) navigate("/thanks")
  
  const cachedData = JSON.parse(sessionStorage.getItem("formData"))
  const [formState, setFormState] = useState( cachedData || defaultObj);
  
  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formState));
  });


  const setSelections = (selections) => {
      setFormState({
        ...formState,
        selections,
      });
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
        season={season}
      />
      <form id="new-submission" onSubmit={handleSubmit}>
        <PersonalInfo formState={formState} setFormState={setFormState} />
        {!formState.random && (
          <>
            {[...season.queens]
              .slice(season.queensInFinale, season.queens.length)
              .map((q, num) => (
                <Container
                  key={`Top ${season.queens.length - num}`}
                  heading={`Top ${season.queens.length - num}`}
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
                  />
                </Container>
              ))}

            <Container heading="Finale">
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
              />
            </Container>
            <input
              id="new-submission"
              onChange={() => null}
              name="submit"
              type="submit"
              value="Submit"
              className="pink-button form-button"
            />
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
