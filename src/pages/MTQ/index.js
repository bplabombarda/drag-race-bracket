import Container from "../../components/Container";
import normalizeName from "../../utilities/normalizeName";
import "./MTQ.scss";

export default function MTQ({ season }) {
  return (
    <>
      {season.queens.map((queen) => {
        const normal = normalizeName(queen.name);
        return (
          <Container
            key={queen.name}
            collapsible
            heading={queen.name}
            subheading={`${queen.age}, ${queen.city}`}
            imageName={queen.name}
          >
            <img
              className="large-img"
              src={require(`../../assets/queens/large/${normal}.png`)}
            />
            <span className="description">{queen.description}</span>
          </Container>
        );
      })}
    </>
  );
}
