import React from "react";
import Container from "../../components/Container"
 import "./Submission.scss"

export default function Submission({season, location: { state } }) {
  console.log("state", state.selections);
  const arr = Object.keys({ ...state.selections }).filter(a => a !== "finale")
  console.log('arr', arr)
  return (
    <>
      <h1>{state.name}</h1>
      {arr.map((a, num) => {

        const section = season.queens.length - num;
        console.log('section', section)
        return (
          <Container key={num} collapsible heading={`Top ${section}`}>
            <SubmissionContent
              winner={state.selections[`top${section}`].winner}
              top={state.selections[`top${section}`].top}
              bottom={state.selections[`top${section}`].bottom}
              eliminated={state.selections[`top${section}`].eliminated}
            />
          </Container>
        );
      })}
      <Container collapsible heading="Finale">
        <SubmissionContent
          winner={state.selections.finale.winner}
          top={state.selections.finale.runnerUp1}
          bottom={state.selections.finale.runnerUp2}
          eliminated={state.selections.finale.congeniality}
        />
      </Container>
    </>
  );
}

const SubmissionContent = ({winner, top, bottom, eliminated, finale=false}) => (
  <>
    <Selection winner label="Winner" icon={(`../../assets/queens/circle/${winner}.png`)} name={winner} />
    <Selection label={!finale ?"Top":"Runner Up"} icon={(`../../assets/queens/circle/${top}.png`)} name={top} />
    <Selection label={!finale ?"Bottom":"Runner Up"} icon={(`../../assets/queens/circle/${bottom}.png`)} name={bottom} />
    <Selection label={!finale ?"Eliminated":"Miss Congeniality"} icon={(`../../assets/queens/circle/${eliminated}.png`)} name={eliminated} />
  </>
)
name

const Selection = ({ label, icon, name, winner = false, finale = false }) => (
  <div
    className={`selection-container ${winner ? "winner" : ""} ${
      finale ? "finale" : ""
    }`}
  >
    <div className="label">{label}</div>
    <img className="selection-image" src={icon} />
    <div className="name">{name}</div>
  </div>
);