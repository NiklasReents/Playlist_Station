import React from "react";

import SongImage from "./SongImage.js";

export default function SongElement(props) {
  const {
    index,
    setSongState,
    currentImg = "none",
    imgStr,
    imgFile,
    name,
    artist,
    genre,
  } = props;
  const imgExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  return (
    <tr id="song-element">
      <SongImage
        index={index}
        currentImg={currentImg}
        imgSrc={imgExt.test(imgStr) ? imgFile : imgStr}
      />
      <td>
        <span>{name}</span>
        <span>{artist}</span>
        <span>{genre}</span>
      </td>
    </tr>
  );
}
