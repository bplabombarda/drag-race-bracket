import "./HomePage.scss";
import Container from "../../components/Container";
import Link from "../../components/Link";
import groupPromo from "../../assets/group-promo.png";

export default function HomePage({ season }) {
  return (
    <>
      <Container heading={season.name}>
        <img className="group-promo" src={groupPromo}></img>
        <br />
        <div className="welcome">
          Welcome DillCappers! Please review the rules and then click the
          &apos;New Submission&apos; button to enter a Dillcap for this season!
          After you submit and are taken to the thank you page, you are all set!
          Come back at the beginning of next weeks episode to view your
          submission!
        </div>
      </Container>
      <div className="links-container">
        <Link path="/rules">Rules</Link>
        <Link path="/mtq">Meet The Queens</Link>
        <Link path="/submissions/new">New Submission</Link>
      </div>
    </>
  );
}
