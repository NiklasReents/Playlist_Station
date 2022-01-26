import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Foot(props) {
  const { currentSong, songState, setListMode, listMode } = props;
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
      setListMode("List");
    } else if (playlistStatus === "images/playlist.png") {
      setPlaylistStatus("images/shuffle.png");
      setListMode("Shuffle");
    } else {
      setPlaylistStatus("images/play-button.png");
      setListMode("Single");
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
          <div>{listMode}</div>
        </div>
      </td>
    </tr>
  );
}
