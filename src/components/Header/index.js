import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link className="dillcap" to="/">
        dillcap
      </Link>
    </header>
  );
}
