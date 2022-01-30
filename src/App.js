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
import { NetworkHandler } from "./modules/networkHandler.js";
import { RouteHandler } from "./modules/routeHandler.js";
import { FetchHandler } from "./modules/fetchHandler.js";
import { ImageHandler } from "./modules/imageHandler.js";
import "./styles/App.css";

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
  const [currentSong, setCurrentSong] = useState(null);
  const [songState, setSongState] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const [songFile, setSongFile] = useState("");
  const [currentList, setCurrentList] = useState("");
  const [tokenFound, setTokenFound] = useState(false);
  const [listMode, setListMode] = useState("Single");
  const imgPath = useRef("");
  const songPath = useRef("");
  const userLoggedIn = useRef(false);
  const arrow = useRef();
  const imgDisplayed = useRef(false);
  const loc = useLocation();
  const pending = <Pending bodyState={bodyState} />;
  const playlistUrl = "http://localhost:2000/playlists";
  const imgUrl = `http://localhost:2000/playlists/images/${imgPath.current}`;
  const songUrl = `http://localhost:2000/playlists/songs/${songPath.current}`;
  const serverUrl = "http://localhost:2000";
  const imgExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  const cookie = new Cookies();
  const audioElement = new Audio();
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
  const routeArgs = [
    loc,
    arrow,
    songPath,
    currentImg,
    setCurrentSong,
    setSongState,
  ];
  const fetchArgs = [
    axios,
    playlistUrl,
    cookie,
    controller,
    setPlaylistData,
    imgUrl,
    setImgFile,
    songUrl,
    setSongFile,
  ];
  const imgArgs = [
    renderPlaylist,
    currentImg,
    imgPath,
    songPath,
    setCurrentImg,
    setCurrentSong,
    setSongState,
    imgDisplayed,
  ];
  const networkHandler = new NetworkHandler(...networkArgs);
  const routeHandler = new RouteHandler(...routeArgs);
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
    routeHandler.setArrow();
    if (loc.pathname === "/" || loc.pathname === "/playlists") {
      fetchHandler.fetchList();
    }
    return () => controller.abort();
  }, [loc]);

  useEffect(() => {
    if (imgExt.test(imgPath.current)) fetchHandler.fetchImage();
    if (songPath.current) fetchHandler.fetchSong();
    return () => controller.abort();
  }, [imgUrl]);

  function renderPlaylist() {
    return playlistData[playlistIndex].values.map((v, ind) => {
      const imageHandler = new ImageHandler(ind, ...imgArgs);
      return (
        <SongElement
          key={v._id}
          songFile={songFile}
          audioElement={audioElement}
          index={ind}
          setSongState={setSongState}
          currentImg={currentImg[ind]}
          imgStr={v.imagefile}
          imgFile={imgFile}
          imageHandler={imageHandler}
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
          routeHandler={routeHandler}
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
            path="/passwordreset"
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
