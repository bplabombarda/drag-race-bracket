import React from "react";
import { navigate } from "@reach/router";
import Container from "../../components/Container"
 import "./Submission.scss"

export default function Submission({season, location: { state } }) {
  if (season.submissionsOpen) navigate("/");
  
  const arr = Object.keys({ ...state.selections }).filter(a => a !== "finale")
  return (
    <>
      <h1 className="name-heading">{state.name} - { state.score}</h1>
      {arr.map((a, num) => {
        const section = season.queens.length - num;
        return (
          <Container className="submission" key={num} collapsible heading={`Top ${section}`}>
            <SubmissionContent
              queens={season.queens}
              winner={state.selections[`top${section}`].winner}
              top={state.selections[`top${section}`].top}
              bottom={state.selections[`top${section}`].bottom}
              eliminated={state.selections[`top${section}`].eliminated}
            />
          </Container>
        );
      })}
      <Container className="submission" collapsible heading="Finale">
        <SubmissionContent
          finale
          queens={season.queens}
          winner={state.selections.finale.winner}
          top={state.selections.finale.runnerUp1}
          bottom={state.selections.finale.runnerUp2}
          eliminated={state.selections.finale.congeniality}
        />
      </Container>
    </>
  );
}

const SubmissionContent = ({winner, top, bottom, eliminated, finale=false, queens}) => (
  <>
    <Selection queens={queens} winner label="Winner" icon={require(`../../assets/queens/circle/${winner}.png`)} name={winner} />
    <Selection queens={queens} label={!finale ?"Top":"Runner Up"} icon={require(`../../assets/queens/circle/${top}.png`)} name={top} />
    <Selection queens={queens} label={!finale ?"Bottom":"Runner Up"} icon={require(`../../assets/queens/circle/${bottom}.png`)} name={bottom} />
    <Selection queens={queens} label={!finale ?"Eliminated":"Congeniality"} icon={require(`../../assets/queens/circle/${eliminated}.png`)} name={eliminated} />
  </>
)
name

const Selection = ({
  label,
  icon,
  name,
  winner = false,
  finale = false,
  queens,
}) => (
  <div
    className={`selection-container ${winner ? "winner" : ""} ${
      finale ? "finale" : ""
    }`}
  >
    <div className="label">{label}:</div>
    <img className="selection-image" src={icon} />
    <div className="name">{getFullName(queens, name)}</div>
  </div>
);

const getFullName = (queens, string) => {
  const queen = queens.filter(q => q.name.toLowerCase().includes(string))
  return queen[0].name
}