import React from "react";
import "./header.scss";
import { Link } from "@reach/router";

export default function Header() {
  return (
    <header>
      <Link className="dillcap" to="/">
        dillcap
      </Link>
    </header>
  );
}
