import React from "react";
import { Link } from "react-router-dom";

export default function Menu(props) {
  const { routeHandler } = props;
  return (
    <div id="menu-overlay">
      <Link to="/register">
        <button onClick={routeHandler.resetImages}>Register</button>
      </Link>
      <Link to="/login">
        <button onClick={routeHandler.resetImages}>Login</button>
      </Link>
    </div>
  );
}
