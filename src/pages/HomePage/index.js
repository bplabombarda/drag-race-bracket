import React from "react";
import Enter from "../Enter"
import "./HomePage.scss";

import Container from "../../components/Container";
import Link from "../../components/Link";
import groupPromo from "../../assets/group-promo.png" 

export default function HomePage({ season }) {
  return (
    <>
      {window.innerWidth / window.innerHeight <= 0.65 && <Enter />}

      <Container heading={season.name}>
        <img className="group-promo" src={groupPromo}></img>
      </Container>
      <div className="links-container">
        <Link path="/submissions/new">New Submission</Link>
        <Link path="/mtq">Meet The Queens</Link>
        <Link path="/rules">Rules</Link>
      </div>
    </>
  );
}
