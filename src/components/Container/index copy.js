import React, { useState } from "react";
import "./Container.scss";

const Container = ({ heading, collapsible = false, children }) => {
  const [isShowing, setToggled] = useState(!collapsible);
  const toggleTrueFalse = () => setToggled(!isShowing);

  return (
    <div className="container">
      <div className="container-header">
        <span>{heading}</span>
        {collapsible && (
          <button onClick={toggleTrueFalse} className="button-container">
            <span className="icon">{isShowing ? "∧" : "∨"}</span>
          </button>
        )}
      </div>
      {isShowing && <div className="container-content">{children}</div>}
    </div>
  );
};

export default Container;
