import React, { useState } from "react";
import { Link as RouterLink } from "@reach/router";
import "./Link.scss";

const Link = ({ path, children}) => {
  return (
    <RouterLink className="pink-button" to={path}>
      { children}
    </RouterLink>
  );
};

export default Link;
