import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav">
      <NavLink to="/">
        <img
          src="/images/logo.png" // Coloque a logo simplificada da Netflix
          alt="Netflix Logo"
          className="nav__logo"
        />
      </NavLink>
      <input type="text" placeholder="Pesquisar" className="nav__search" />
    </div>
  );
};

export default NavBar;
