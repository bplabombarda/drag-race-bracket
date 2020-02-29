import React from "react";
import "./header.scss";
import { Link, Router } from "@reach/router";

export default function Header() {
  return (
    <header>
      <h3>dillcap</h3>
      <nav>
        <Link to="/">Seasons</Link>
        <Link to="">View All</Link> <Link to="submissions/new">New</Link>
        {/* <Link to='submissions/edit'>Edit</Link> */}
      </nav>
    </header>
  );
}
