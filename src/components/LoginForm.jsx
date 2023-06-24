import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("user");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "carlos" && password === "rockthecode") {
      const user = {
        username: "carlos",
        name: "Carlos",
      };
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true);
    } else {
      alert("Credenciales inválidas");
    }
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};





export default LoginForm;
