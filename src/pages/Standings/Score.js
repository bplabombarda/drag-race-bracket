import React from "react";
import winner from "../../assets/winner.png"
const Score = ({ score, index }) => {
  return (
    <div className="score-container">
      <div className="score">{score}</div>
      <img className="score-icon" src={winner} />
    </div>
  );
};

export default Score;
