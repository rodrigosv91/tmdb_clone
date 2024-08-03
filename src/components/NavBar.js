import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="nav">
      <NavLink to="/">
        <img src="/images/logo.png" alt="Netflix Logo" className="nav__logo" />
      </NavLink>
      <input
        type="text"
        placeholder="Pesquisar"
        className="nav__search"
        onChange={handleSearch}
      />
      <div className="nav__dropdown">
        <button className="nav__dropdownButton" onClick={toggleDropdown}>
          <img
            src="/images/menu-icon.png"
            alt="Menu"
            className="nav__menuIcon"
          />
        </button>
        {showDropdown && (
          <div className="nav__dropdownContent">
            <button onClick={handleLogout}>Deslogar da conta Netflix</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
