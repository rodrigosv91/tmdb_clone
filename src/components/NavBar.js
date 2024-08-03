import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload(); // Forçar recarregamento para atualizar o estado de autenticação
  };

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

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
      {isAuthenticated && (
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
      )}
    </div>
  );
};

export default NavBar;
