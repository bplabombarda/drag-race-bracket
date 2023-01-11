import React, {useState} from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "@reach/router";
import "./Header.scss";
import "./Footer.scss";
import home from "../../assets/home.png"
import logo from "../../assets/header-logo.png";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };
  return (
    <header>
      <Link to="/">
        <img className="home" src={home}></img>
      </Link>
      <img className="logo" src={logo}></img>
      <Menu right isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
        <Link
          className="hamburger-link"
          to="/"
          onClick={closeSideBar}
        >
          Home
        </Link>
        <Link
          className="hamburger-link"
          to="/submissions/new"
          onClick={closeSideBar}
        >
          New Submission
        </Link>
        <Link className="hamburger-link" to="/mtq" onClick={closeSideBar}>
          Meet The Queens
        </Link>
        <Link className="hamburger-link" to="/rules" onClick={closeSideBar}>
          Rules
        </Link>
      </Menu>
    </header>
  );
};


export const Footer = () => (
  <footer>
    ©Dillcap Inc. & Associated Entities, {new Date().getFullYear()}
  </footer>
);
