import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import normalizeName from "../../utilities/normalizeName";
import { navigate } from "@reach/router";
import { TextInput, SelectGroup } from "../../components/Inputs"
import FinaleSelectGroup  from "../../components/Inputs/FinaleSelectGroup";
import "./NewSubmission.scss";

export default function NewSubmission({ season, addSubmission }) {

  const [formState, setFormState] = useState({ name: "", venmo:"", selections: {} });
  useEffect(() => {
    console.log(formState.selections);
  });


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

  const setSelections = (selections) => {
      setFormState({
        ...formState,
        selections,
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formState", formState);
    addSubmission(season.seasonId, formState);
    navigate(`/thanks`);
  };

  const numberOfQueens = getNumberOfQueens(season.queensInFinale, season.queens)
  console.log('numberOfQueens', numberOfQueens)
  return (
    <form onSubmit={handleSubmit}>
      <Container heading="Enter the Workroom">
        <TextInput
          label="Name"
          handleOnChange={setName}
          value={formState.name}
        />
        <TextInput
          label="Email"
          handleOnChange={setEmail}
          value={formState.email}
          type="email"
        />
        <TextInput
          label="Venmo"
          handleOnChange={setVenmo}
          value={formState.venmo}
        />
      </Container>
      {numberOfQueens.map((num) => {
        return (
          <Container
            key={num}
            heading={`Top ${num + 1 + season.queensInFinale}`}
          >
            <SelectGroup
              sectionIndex={num + 1 + season.queensInFinale}
              setSelections={setSelections}
              eliminated={getEliminatedQueens(formState.selections, num)}
              eliminatedWeeks={createEliminatedDetailsObject(
                formState.selections
              )}
              options={createOptionsArray(
                season.queens,
                formState.selections,
                num,
                season.queensInFinale
              )}
              formState={formState}
            />
          </Container>
        );
      })}
      <Container heading="Finale">
        <FinaleSelectGroup
          sectionIndex={-1}
          setSelections={setSelections}
          eliminated={getEliminatedQueens(formState.selections, "finale")}
          eliminatedWeeks={createEliminatedDetailsObject(formState.selections)}
          options={createOptionsArray(
            season.queens,
            formState.selections,
            -1,
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
        onChange={() => null}
        name="submit"
        type="submit"
        value="Submit"
        className="pink-button form-button"
      />
    </form>
  );
}

function getNumberOfQueens(numberInFinal, options) {
  const delta = options.length - numberInFinal - 1;
  const numOfSections = delta > 0 ? delta : 0;
  return [...Array(numOfSections).keys()].reverse();
}

function getAllOptions(queens = [], extraQueens = [], selections) { 
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

function createOptionsArray(queens, selections, num, queensInFinale) {
  const eliminated = getEliminatedQueens(selections, num);
  const eliminatedWeeks = createEliminatedDetailsObject(selections);
  const currentWeek = num + 1 + queensInFinale
  return queens
    .map((queen) => {
      const name = normalizeName(queen.name);
      const alreadyEliminated = eliminated.includes(name) && eliminatedWeeks[name] >= currentWeek
      const alreadyChosen =
        (selections[`top${currentWeek}`] &&
          (selections[`top${currentWeek}`].winner === name ||
            selections[`top${currentWeek}`].top === name ||
            selections[`top${currentWeek}`].bottom === name ||
            selections[`top${currentWeek}`].eliminated === name)) ||
        (selections.finale && currentWeek === queensInFinale &&
          (selections.finale.winner === name ||
            selections.finale.runnerUp1 === name ||
            selections.finale.runnerUp2 === name ||
            selections.finale.missCongeniality === name));
      
      const label = (
        <div
          className={`option-container ${
            alreadyEliminated || alreadyChosen ? "eliminated" : ""
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
      return { value: name, label, isDisabled: alreadyEliminated, required: true };
    })
    .sort((x, y) => {
      const current =
        eliminated.includes(normalizeName(x.value)) &&
        eliminatedWeeks[normalizeName(x.value)] >= currentWeek;

      const previous =
        eliminated.includes(normalizeName(y.value)) &&
        eliminatedWeeks[normalizeName(y.value)] >= currentWeek;

      return (current === previous)? 0 : current? 1 : -1;
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