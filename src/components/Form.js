import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import PlaylistForm from "./PlaylistForm.js";
import { FormHandler } from "../modules/formHandler.js";

export default function Form(props) {
  const { formDisabled, statusMessage } = props;
  const [urlParameterBox, setUrlParameterBox] = useState(<></>);
  const [imgValue, setImgValue] = useState("");
  const [imgLabel, setImgLabel] = useState("Add an image file.");
  const [audioLabel, setAudioLabel] = useState("Add an audio file.");
  const [imgButtonContent, setImgButtonContent] = useState("X");
  const [messageBox, setMessageBox] = useState(<></>);
  const urlBoxRef = useRef();
  const imgRef = useRef();
  const audioRef = useRef();
  const timeOut = useRef(0);
  const formUrl = "http://localhost:2000/playlists";
  const cookie = new Cookies();
  const formHandler = new FormHandler(
    imgRef,
    setImgValue,
    setImgLabel,
    audioRef,
    setAudioLabel
  );

  useEffect(() => {
    clearTimeout(timeOut.current);
    return () => clearTimeout(timeOut.current);
  }, [timeOut]);

  async function sendForm(e) {
    e.preventDefault();
    if (formDisabled) {
      setMessageBox(<span id="submit-overlay">{statusMessage}</span>);
    } else {
      const formData = new FormData(e.target);
      await axios
        .post(formUrl, formData, {
          headers: { authorization: cookie.get("PLSJwt") },
        })
        .then((res) => {
          setMessageBox(<span id="submit-overlay">{res.data}</span>);
        })
        .catch((err) => {
          setMessageBox(
            <span id="submit-overlay">
              {err.message === "Network Error"
                ? "Not connected to the server!"
                : "Request aborted!"}
            </span>
          );
        });
    }
    timeOut.current = setTimeout(() => setMessageBox(<></>), 3000);
  }

  return (
    <tr id="form">
      <td>
        <PlaylistForm
          sendForm={sendForm}
          formDisabled={formDisabled}
          imgLabel={imgLabel}
          urlBoxRef={urlBoxRef}
          urlParameterBox={urlParameterBox}
          validateImageUpload={formHandler.validateImageUpload}
          imgRef={imgRef}
          imgValue={imgValue}
          removeFile={formHandler.removeFile}
          imgButtonContent={imgButtonContent}
          audioLabel={audioLabel}
          validateAudioUpload={formHandler.validateAudioUpload}
          audioRef={audioRef}
          messageBox={messageBox}
        />
      </td>
    </tr>
  );
}
