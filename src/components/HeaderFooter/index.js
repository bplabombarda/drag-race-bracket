import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "@reach/router";
import "./Header.scss";
import "./Footer.scss";
import home from "../../assets/home.png"
import logo from "../../assets/logo.png";

export const Header = () => (
  <header>
    <Link to="/">
      <img src={home}></img>
    </Link>
    <img src={logo}></img>
    <Menu right>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
      <a className="menu-item--small" href="">
        Settings
      </a>
    </Menu>
  </header>
);


export const Footer = () => (
  <footer>
    ©Dillcap Inc. & Associated Entities, {new Date().getFullYear()}
  </footer>
);
