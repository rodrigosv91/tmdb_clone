// src/App.js
import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import NavBar from "./components/NavBar";
import AuthContext from "./contexts/AuthContext";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <Router>
      {isAuthenticated && <NavBar onSearch={handleSearch} />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home searchTerm={searchTerm} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/movie/:id"
          element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
