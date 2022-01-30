import React, { useRef } from "react";

export default function SongImage(props) {
  const { audioElement, setSongState, currentImg, imgSrc } = props;
  const imgElement = useRef();
  const progressBar = useRef();

  return (
    <td id="image-element" style={{ display: currentImg }}>
      <div>
        <img src="images/minus.png" alt="Decrease Volume" />
        <img ref={imgElement} src={imgSrc} alt="" />
        <img src="images/plus.png" alt="Increase Volume" />
      </div>
      <div id="progress-bar-container">
        <div ref={progressBar} id="progress-bar"></div>
      </div>
    </td>
  );
}
