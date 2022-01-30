import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

import Menu from "./Menu.js";

export default function Head(props) {
  const {
    playlistData,
    setCurrentList,
    setPlaylistIndex,
    playlistIndex,
    username,
    currentList,
    arrow,
  } = props;
  const [menuDisplay, setMenuDisplay] = useState(null);
  const playlistSelection = useRef([]);
  const loc = useLocation();
  const menu = <Menu />;

  function changePlaylist(e) {
    let i = 0;
    let len = playlistData.length;
    let index;
    for (i; i < len; i++) {
      if (playlistData[i].playlistname === e.target.value) {
        setCurrentList(playlistData[i].playlistname);
        index = i;
      }
    }
    setPlaylistIndex(index);
  }

  function renderOptions() {
    const keys = [];
    let i = 0;
    let len = playlistData.length;
    for (i; i < len; i++) {
      keys[keys.length] = playlistData[i].playlistname;
    }
    playlistSelection.current = keys;
    return playlistSelection.current.map((v, ind) => {
      return <option key={ind}>{v}</option>;
    });
  }

  function removeMenuBox() {
    if (menuDisplay) setMenuDisplay(null);
  }

  function changeHeadDisplay() {
    return !playlistData ||
      !playlistData[playlistIndex] ||
      loc.pathname !== "/playlists" ? (
      <div>
        <strong>Welcome, {username}!</strong>
      </div>
    ) : (
      <select onChange={changePlaylist} defaultValue={currentList}>
        {renderOptions()}
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
        <img onClick={displayMenuBox} src="images/menu.png" alt="Menu" />
        {menuDisplay}
      </th>
    </tr>
  );
}
