import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const location = useLocation();

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="nav">
      <NavLink to="/">
        <img src="/images/logo.png" alt="Netflix Logo" className="nav__logo" />
      </NavLink>
      {!location.pathname.startsWith("/movie/") && (
        <input
          type="text"
          placeholder="Pesquisar"
          className="nav__search"
          onChange={handleSearch}
        />
      )}
    </div>
  );
};

export default NavBar;
