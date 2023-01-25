import Container from "../../components/Container";
import thankyou from "../../assets/thank-you.png";
import "./ThankYou.scss";

export default function ThankYou({ seasons }) {
  return (
    <>
      <Container heading="Thank You!">
        <div className="thankyou">
          <img src={thankyou} />
          <div className="text">
            <strong>
              Dont forget to venmo @DillonMcGuire $20 to reserve your spot!
            </strong>
            <br /> <br />
            Come back at the beginning of the next episode to view your
            selections and score!
            <br /> <br />
            May the best Dillcapper, WIN!
          </div>
        </div>
      </Container>
    </>
  );
}
