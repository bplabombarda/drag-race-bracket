import React from "react";
import Container from "../../components/Container"
import thankyou from "../../assets/thank-you.png"
 import "./ThankYou.scss"

export default function ThankYou({ seasons }) {

  return (
    <>
      <Container heading="Thank You!">
        <div className="thankyou">
          <img src={thankyou} />
          <h3 className="text">
            The team at Dillcap™ thanks you for your submission! Come back at
            the beginning of the next episode to view your submission!
            <br /> <br />
            May the best Dillcapper, WIN
          </h3>
        </div>
      </Container>
    </>
  );
}
