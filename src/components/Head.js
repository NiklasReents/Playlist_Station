import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import Menu from "./Menu.js";

export default function Head(props) {
  const { username, arrow } = props;
  const [menuDisplay, setMenuDisplay] = useState(null);
  const loc = useLocation();
  const menu = <Menu />;

  function removeMenuBox() {
    if (menuDisplay) setMenuDisplay(null);
  }

  function changeHeadDisplay() {
    return loc.pathname !== "/playlists" ? (
      <div>
        <strong>Welcome, {username}!</strong>
      </div>
    ) : (
      <select defaultValue="Default">
        <option>Default</option>
      </select>
    );
  }

  function displayMenuBox() {
    if (!menuDisplay) setMenuDisplay(menu);
  }

  return (
    <tr onClick={removeMenuBox} id="head">
      <th>
        <Link to={loc.pathname === "/" ? "/playlists" : "/"}>
          <img ref={arrow} src="images/right-arrow.png" alt="Change View" />
        </Link>
      </th>
      <th>{changeHeadDisplay()}</th>
      <th>
        <img onClick={displayMenuBox} src="images/menu.png" alt="Options" />
        {menuDisplay}
      </th>
    </tr>
  );
}
