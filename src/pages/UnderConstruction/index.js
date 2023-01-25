import Container from "../../components/Container";
import gasp from "../../assets/construction.png";
import "./UnderConstruction.scss";

export default function UnderConstruction() {
  return (
    <Container heading="Under Construction">
      <div className="thankyou">
        <img src={gasp} />
        <h3 className="text">
          Sorry! We are currently doing our make up, come back later!
        </h3>
      </div>
      <br />
    </Container>
  );
}
