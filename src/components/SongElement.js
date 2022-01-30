import React, { useEffect } from "react";

import SongImage from "./SongImage.js";

export default function SongElement(props) {
  const {
    songFile,
    audioElement,
    index,
    setSongState,
    currentImg = "none",
    imgStr,
    imgFile,
    imageHandler,
    name,
    artist,
    genre,
  } = props;
  const imgExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  useEffect(() => {
    if (songFile) audioElement.setAttribute("src", songFile);
  }, [audioElement, songFile]);

  return (
    <tr id="song-element">
      <SongImage
        index={index}
        audioElement={audioElement}
        setSongState={setSongState}
        currentImg={currentImg}
        imgSrc={imgExt.test(imgStr) ? imgFile : imgStr}
      />
      <td onClick={() => imageHandler.toggleImage(index)}>
        <span>{name}</span>
        <span>{artist}</span>
        <span>{genre}</span>
      </td>
    </tr>
  );
}
