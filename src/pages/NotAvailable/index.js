import React from "react";
import Container from "../../components/Container"
import Link from "../../components/Link"
import gasp from "../../assets/gasp.png"
 import "./NotAvailable.scss"

export default function NotAvailable() {
  return (
    <Container heading="GASP!">
      <div className="thankyou">
        <img src={gasp} />
        <h3 className="text">Looks like you got lost!</h3>
      </div>
      <br />
      <Link path="/">Theres no place like Home</Link>
    </Container>
  );
}
