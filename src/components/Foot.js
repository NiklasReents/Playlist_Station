import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Foot(props) {
  const { currentSong, songState, listMode } = props;
  const [playlistStatus, setPlaylistStatus] = useState(
    "images/play-button.png"
  );
  const loc = useLocation();

  function changeFootDisplay() {
    return loc.pathname === "/" ? (
      <td>
        <strong>Create a playlist!</strong>
      </td>
    ) : (
      <td>
        <span>{currentSong}</span>
        <span>{songState}</span>
      </td>
    );
  }

  function switchPlaylistStatus() {
    if (playlistStatus === "images/play-button.png") {
      setPlaylistStatus("images/playlist.png");
      listMode.current = "List";
    } else if (playlistStatus === "images/playlist.png") {
      setPlaylistStatus("images/shuffle.png");
      listMode.current = "Shuffle";
    } else {
      setPlaylistStatus("images/play-button.png");
      listMode.current = "Single";
    }
  }

  return (
    <tr id="foot">
      <td>
        <div></div>
      </td>
      {changeFootDisplay()}
      <td>
        <div
          style={{ visibility: loc.pathname === "/" ? "hidden" : "visible" }}
        >
          <img
            onClick={switchPlaylistStatus}
            src={playlistStatus}
            alt="Switch Mode"
          />
          <div>{listMode.current}</div>
        </div>
      </td>
    </tr>
  );
}
