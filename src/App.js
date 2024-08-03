import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <NavBar onSearch={handleSearch} />}
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
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
            element={
              isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
