import React, { useState, useRef, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import Head from "./components/Head.js";
import Foot from "./components/Foot.js";
import "./styles/App.css";

export default function App() {
  const [username, setUsername] = useState("User");
  const [currentSong, setCurrentSong] = useState(null);
  const [songState, setSongState] = useState(null);
  const [listMode, setListMode] = useState("Single");
  const arrow = useRef();
  const loc = useLocation();

  useEffect(() => {
    if (loc.pathname === "/") {
      arrow.current.style.transform = "rotateX(180deg)";
    } else {
      arrow.current.style.transform = "rotateY(180deg)";
    }
  }, [loc]);

  return (
    <table id="app">
      <thead>
        <Head username={username} arrow={arrow} />
      </thead>
      <tbody>
        <Routes>
          <Route
            path="/"
            element={
              <tr>
                <td>Form</td>
              </tr>
            }
          />
          <Route
            path="/playlists"
            element={
              <tr>
                <td>Playlists</td>
              </tr>
            }
          />
          <Route
            path="/register"
            element={
              <tr>
                <td>Register</td>
              </tr>
            }
          />
          <Route
            path="/login"
            element={
              <tr>
                <td>Login</td>
              </tr>
            }
          />
          <Route
            path="/:tokenPath"
            element={
              <tr>
                <td>ReceiveMail</td>
              </tr>
            }
          />
          <Route
            path="passwordreset"
            element={
              <tr>
                <td>PasswordReset</td>
              </tr>
            }
          />
        </Routes>
      </tbody>
      <tfoot>
        <tr>
          <th>
            <Foot
              currentSong={currentSong}
              songState={songState}
              setListMode={setListMode}
              listMode={listMode}
            />
          </th>
        </tr>
      </tfoot>
    </table>
  );
}
