import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    // Simular login bem-sucedido
    localStorage.setItem("isAuthenticated", "true");
    window.location.reload(); // Forçar recarregamento para atualizar o estado de autenticação
  };

  return (
    <div className="login">
      <img src="/images/logo.png" alt="Netflix Logo" className="login__logo" />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
