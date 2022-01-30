import React, { useState, useRef, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import Pending from "./components/Pending.js";
import SongElement from "./components/SongElement.js";
import Head from "./components/Head.js";
import Form from "./components/Form.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import ReceiveMail from "./components/ReceiveMail.js";
import PasswordReset from "./components/PasswordReset.js";
import Foot from "./components/Foot.js";
import "./styles/App.css";
import { NetworkHandler } from "./modules/networkHandler.js";
import { FetchHandler } from "./modules/fetchHandler.js";

export default function App() {
  const [bodyState, setBodyState] = useState();
  const [username, setUsername] = useState(
    localStorage.getItem("loginData") || "User"
  );
  const [formDisabled, setFormDisabled] = useState(true);
  const [playlistData, setPlaylistData] = useState();
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [currentImg, setCurrentImg] = useState([]);
  const [currentList, setCurrentList] = useState("");
  const [tokenFound, setTokenFound] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [songState, setSongState] = useState(null);
  const [listMode, setListMode] = useState("Single");
  const userLoggedIn = useRef();
  const arrow = useRef();
  const loc = useLocation();
  const pending = <Pending bodyState={bodyState} />;
  const playlistUrl = "http://localhost:2000/playlists";
  const serverUrl = "http://localhost:2000";
  const cookie = new Cookies();
  const controller = new AbortController();
  const networkArgs = [
    cookie,
    setUsername,
    userLoggedIn,
    setFormDisabled,
    playlistData,
    playlistIndex,
    setBodyState,
    setStatusMessage,
    resStatus,
    pending,
    renderPlaylist,
  ];
  const fetchArgs = [axios, playlistUrl, cookie, controller, setPlaylistData];
  const networkHandler = new NetworkHandler(...networkArgs);
  const fetchHandler = new FetchHandler(...fetchArgs);

  useEffect(() => {
    axios
      .get(serverUrl)
      .then((res) => setResStatus(res.statusText))
      .catch((err) => setResStatus(err.message));
    networkHandler.checkWebStorage();
    networkHandler.checkLoginStatus();
    networkHandler.checkConnection();
  });

  useEffect(() => {
    if (loc.pathname === "/") {
      arrow.current.style.transform = "rotateX(180deg)";
    } else {
      arrow.current.style.transform = "rotateY(180deg)";
    }
    if (loc.pathname === "/" || loc.pathname === "/playlists") {
      fetchHandler.fetchList();
    }
    return () => controller.abort();
  }, [loc]);

  function renderPlaylist() {
    return playlistData[playlistIndex].values.map((v, ind) => {
      return (
        <SongElement
          key={v._id}
          index={ind}
          setSongState={setSongState}
          currentImg={currentImg[ind]}
          imgStr={v.imagefile}
          imgFile=""
          audioStr={v.songfile}
          name={v.song}
          artist={v.artist}
          genre={v.genre}
        />
      );
    });
  }

  return (
    <table id="app">
      <thead>
        <Head
          playlistData={playlistData}
          setCurrentList={setCurrentList}
          setPlaylistIndex={setPlaylistIndex}
          playlistIndex={playlistIndex}
          username={username}
          currentList={currentList}
          arrow={arrow}
        />
      </thead>
      <tbody>
        <Routes>
          <Route
            path="/"
            element={
              <Form formDisabled={formDisabled} statusMessage={statusMessage} />
            }
          />
          <Route path="/playlists" element={networkHandler.bodyStatus()} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setUsername={setUsername}
                setFormDisabled={setFormDisabled}
              />
            }
          />
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
