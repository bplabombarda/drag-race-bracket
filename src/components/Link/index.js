import { Link as RouterLink } from "react-router-dom";
import "./Link.scss";

const Link = ({ path = "", children, state }) => {
  return (
    <RouterLink className="pink-button" to={path} state={state}>
      {children}
    </RouterLink>
  );
};

export default Link;
