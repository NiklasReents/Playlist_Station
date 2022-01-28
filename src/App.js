import React, { useState, useRef, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import Head from "./components/Head.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import ReceiveMail from "./components/ReceiveMail.js";
import PasswordReset from "./components/PasswordReset.js";
import Foot from "./components/Foot.js";
import "./styles/App.css";

export default function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("loginData") || "User"
  );
  const [tokenFound, setTokenFound] = useState(false);
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
          <Route
            path="/:tokenPath"
            element={
              <ReceiveMail
                setTokenFound={setTokenFound}
                tokenFound={tokenFound}
              />
            }
          />
          <Route
            path="passwordreset"
            element={
              tokenFound ? (
                <PasswordReset setTokenFound={setTokenFound} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </tbody>
      <tfoot>
        <Foot
          currentSong={currentSong}
          songState={songState}
          setListMode={setListMode}
          listMode={listMode}
        />
      </tfoot>
    </table>
  );
}
