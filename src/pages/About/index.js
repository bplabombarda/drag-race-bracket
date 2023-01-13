import React from "react";
import Container from "../../components/Container"
import dillon from "../../assets/dillon.png"
import joe from "../../assets/joe.png";
import paul from "../../assets/paul.png";
import brett from "../../assets/brett.png";

 import "./About.scss"

export default function About({ seasons }) {

  return (
    <Container heading="About">
      <div className="about-container">
        <h1 className="about">
          Dillcap is a for-profit, occasionally charitble, LGBTQ owned and
          operated, unafffilated branch of the Ru-Empire. We believe that
          experience is its own compensation, and we dedicate our lives to this
          project.
          <br />
          <br />
          <br />
        </h1>
        
        <div className="employee-container">
          <div className="left">
            <img src={dillon} />
            <div className="name">
              Dillon <br /> <em>She-EO</em>
            </div>
          </div>
          <em className="quote">
            "Gaslighting, gatekeeping, and girlbossing is at the core of Dillcap
            and the work we do and the team I've cultivated."
          </em>
        </div>

        <div className="employee-container">
          <div className="left">
            <img src={joe} />
            <div className="name">
              Joe <br /> <em>Sr. Designer</em>
            </div>
          </div>
          <em className="quote">
            "Dillcap gives me the opportunity to make no income while I pursue
            my true passions - werking, serving and slaying. I'm required to
            stay up until 1am, and watch clips from the Miss Continential 2002 as I work."
          </em>
        </div>

        <div className="employee-container">
          <div className="left">
            <img src={brett} />
            <div className="name">
              Brett <br /> <em>Director of Engineering and Janitorial</em>
            </div>
          </div>
          <em className="quote">
            "Dillcap was the only employer to offer to pay me in cheesies gift cards and look the other way regarding my past OSHA violations."
          </em>
        </div>

        <div className="employee-container">
          <div className="left">
            <img src={paul} />
            <div className="name">
              Paul <br /> <em>QA Intern</em>
            </div>
          </div>
          <em className="quote">
            "Dillcap encourages me to excel as a thought leader by leveraging
            big data to uncover robust insights while generating organic growth
            & disruptive innovation. I especially love the work hard/play hard
            culture at Dillcap."
          </em>
        </div>
      </div>
    </Container>
  );
}
