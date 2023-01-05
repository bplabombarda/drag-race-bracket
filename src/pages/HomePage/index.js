import React from "react";
import { Link } from "@reach/router";
import "./styles/index.scss";

import Container from "../../components/Container";

export default function HomePage({ seasons }) {
  return (
    <>
      <ul className="seasons-list">
        <Container collapsible={true} heading="Week 1">
          Content
        </Container>
        <br></br>
        {Object.keys(seasons) &&
          Object.keys(seasons)
            .sort((a, b) => seasons[a].finished - seasons[b].finished)
            .map((seasonId) => (
              <li
                key={`season_${seasonId}`}
                style={{
                  border: `4px solid ${seasons[seasonId].primary}`,
                }}
              >
                <Link
                  style={{
                    color: `${
                      seasons[seasonId].finished
                        ? "#AFC4D8"
                        : seasons[seasonId].primary
                    }`,
                    fontWeight: seasons[seasonId].finished ? "regular" : "bold",
                  }}
                  to={`seasons/${seasonId}`}
                >
                  {seasons[seasonId].name}
                </Link>
              </li>
            ))}
      </ul>
    </>
  );
}
