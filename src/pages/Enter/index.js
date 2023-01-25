import { useState } from "react";
import { redirect } from "react-router-dom";
import enter from "../../assets/enter.png";
import "./Enter.scss";

export default function Enter({ seasons }) {
  const [isEntered, animate] = useState(false);
  const enterAnimation = () => {
    animate(true);
    redirect(`/`);
    sessionStorage.setItem("entered", true);
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${enter})` }}
        className={`image left ${isEntered ? "slide-off-left" : ""}`}
        onClick={enterAnimation}
      />
      <div
        onClick={enterAnimation}
        style={{ backgroundImage: `url(${enter})` }}
        className={`image right ${isEntered ? "slide-off-right" : ""}`}
      />
    </>
  );
}
