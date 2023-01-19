import React from "react";
import winner from "../../assets/winner.png"
import second from "../../assets/second.png";
import safe from "../../assets/safe.png";
import last from "../../assets/last.png";
import tie from "../../assets/tie.png";


const Score = ({ placement, isLastPlace, isTie }) => {
  return (
    <div className="placement-container">
      <div className="placement">{placement}</div>
      <img className="placement-icon" src={chooseImage(placement, isLastPlace, isTie)} />
    </div>
  );
};

export default Score;

const chooseImage = (placement, isLastPlace, isTie) => {
  if (isTie) return tie
  if (isLastPlace) return last;
  if (placement === 1) return winner
  if (placement === 2) return second;
  return safe;

}