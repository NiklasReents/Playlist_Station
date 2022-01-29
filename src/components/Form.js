import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import ParameterBox from "./ParameterBox.js";
import PlaylistForm from "./PlaylistForm.js";
import { FormHandler } from "../modules/formHandler.js";

export default function Form(props) {
  const { formDisabled, statusMessage } = props;
  const [backgroundColor, setBackgroundColor] = useState("ffffff");
  const [textColor, setTextColor] = useState("000000");
  const [textContent, setTextContent] = useState("Text");
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
  const urlBox = (
    <ParameterBox
      backgroundColor={backgroundColor}
      textColor={textColor}
      textContent={textContent}
      setBackgroundColor={setBackgroundColor}
      setTextColor={setTextColor}
      setTextContent={setTextContent}
    />
  );
  const imgUrl = `https://dummyimage.com/400x400/${backgroundColor}/${textColor}&text=${textContent}`;
  const formUrl = "http://localhost:2000/playlists";
  const cookie = new Cookies();
  const formHandler = new FormHandler(
    urlBoxRef,
    setUrlParameterBox,
    imgRef,
    setImgValue,
    setImgLabel,
    audioRef,
    setAudioLabel,
    urlBox,
    imgUrl,
    setImgButtonContent
  );

  useEffect(() => {
    clearTimeout(timeOut.current);
    if (imgRef.current.type === "text") {
      setImgValue(imgUrl);
    }
    return () => clearTimeout(timeOut.current);
  }, [timeOut, imgUrl]);

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
    <tr onClick={formHandler.removeParameterBox} id="form">
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
          displayParameterBox={formHandler.displayParameterBox}
          imgButtonContent={imgButtonContent}
          switchInput={formHandler.switchInput}
          audioLabel={audioLabel}
          validateAudioUpload={formHandler.validateAudioUpload}
          audioRef={audioRef}
          messageBox={messageBox}
        />
      </td>
    </tr>
  );
}
