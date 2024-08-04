import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    setSearchValue("");
    onSearch("");
    logout();
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="nav">
      <NavLink to="/">
        <img src="/images/logo.png" alt="Netflix Logo" className="nav__logo" />
      </NavLink>
      <div className="nav__searchContainer">
        <input
          type="text"
          placeholder="Pesquisar"
          className="nav__search"
          value={searchValue}
          onChange={handleSearch}
        />
        {searchValue && (
          <button className="nav__clearSearch" onClick={clearSearch}>
            X
          </button>
        )}
      </div>
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
