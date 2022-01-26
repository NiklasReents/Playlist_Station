import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div id="menu-overlay">
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
