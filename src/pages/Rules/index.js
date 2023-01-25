import Container from "../../components/Container";
import rules from "../../assets/rules.png";
import "./Rules.scss";

export default function Rules({ season }) {
  return (
    <>
      <Container heading="Rules">
        <div className="rules-container">
          <img src={rules} />
          <ul>
            {season.submissionsOpen && (
              <>
                <div className="rule-header">Entering:</div>
                <li className="rule">
                  <div>&#10024;</div> 1 entry per person
                </li>

                <li className="rule">
                  <div>&#10024;</div> $20 buy in - Venmo me @DillonMcGuire, or
                  Paypal me $10,000
                </li>
                <li className="rule">
                  <div>&#10024;</div> Go through each section and choose who you
                  think will be the winner, in the top, in the bottom, and sent
                  home.
                </li>
                <li className="rule">
                  <div>&#10024;</div> Submit your bracket before{" "}
                  {season.submissionCuttOffDate}
                </li>
              </>
            )}

            <div className="rule-header">Points:</div>
            <li className="rule">
              <div>&#10024;</div> +5 points per right top and bottom
              placement(s){" "}
            </li>
            <li className="rule">
              <div>&#10024;</div> +5 points for correct guess of who wins and
              goes home
            </li>
            <li className="rule">
              <div>&#10024;</div> +15 points points for the winner
            </li>
            <li className="rule">
              <div>&#10024;</div> +10 points for each runner up
            </li>
            <li className="rule">
              <div>&#10024;</div> +5 points for Miss Congeniality
            </li>

            <div className="rule-header">Prizes:</div>
            <li className="rule">
              <div>&#10024;</div> 3rd place will donate 20% of the pot
            </li>
            <li className="rule">
              <div>&#10024;</div> 2nd place will donate 30% of the pot
            </li>
            <li className="rule">
              <div>&#10024;</div> The WINNER will receive a sickening supply of
              color evolution cosmetics, headline Logos drag race tour, be
              featured in a campaign with L.A. Eyeworks, and a cash prize of
              $100,000…. aka the rest of the money, henny.
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
}
