import React from "react";
import "./HomePage.scss";

import Container from "../../components/Container";
import Link from "../../components/Link";

export default function HomePage({ season }) {
  console.log('season', season)
  return (
    <>
      <Container heading={season.name}></Container>
      <div className="links-container">
        <Link path="/submissions">Submissions</Link>
        <Link path="/mtq">Meet The Queens</Link>
        <Link path="/standings">Standings</Link>
      </div>
    </>
  );
}
