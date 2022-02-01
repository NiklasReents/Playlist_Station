import React from "react";

import "../styles/Userform.css";

export default function UserFormHead(props) {
  const { loggedIn, title, logout, message } = props;

  return (
    <div className="formhead-container">
      {loggedIn && title === "Login" ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <h1>{title}</h1>
      )}
      <span>{message}</span>
    </div>
  );
}
