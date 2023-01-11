import React, { useState } from "react";
import normalizeName from "../../utilities/normalizeName";
import "./Container.scss";

const Container = ({ heading, collapsible = false, imageName, subheading, children }) => {
  const [isShowing, setToggled] = useState(!collapsible);
  const toggleTrueFalse = () => {if (collapsible) {setToggled(!isShowing)}}
  const normal = normalizeName(imageName);
  return (
    <div className="container">
      <div onClick={toggleTrueFalse} className="container-header">
        <div className="left-header">
          {imageName && (
            <img
              className="circle-image"
              src={require(`../../assets/queens/circle/${normal}.png`)}
            />
          )}
          {subheading ? (
            <div className="subheading-container">
              <span className="heading">{heading}</span>
              <span className="subheading">{subheading}</span>
            </div>
          ) : (
            <span>{heading}</span>
          )}
        </div>

        {collapsible && (
          <button className="button-container">
            <span className="icon">{isShowing ? "∧" : "∨"}</span>
          </button>
        )}
      </div>
      <div className={`container-content ${isShowing?"visible":"hidden"}`}>{children}</div>
    </div>
  );
};

export default Container;
