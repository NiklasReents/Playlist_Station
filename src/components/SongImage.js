import React, { useRef } from "react";

export default function SongImage(props) {
  const { audioElement, setSongState, currentImg, imgSrc } = props;
  const imgElement = useRef();
  const progressBar = useRef();
  const songStarted = useRef(false);
  const songPlaying = useRef(false);

  function resetSong() {
    songStarted.current = true;
    setTimeout(() => {
      handleAudio();
    }, 100);
    //needs to be adjusted: replaying a song requires a doubleclick
  }

  async function playAudio() {
    await audioElement.play();
    //setSongState("Song playing");
    songPlaying.current = true;
  }

  async function pauseAudio() {
    await audioElement.pause();
    //setSongState("Song suspended");
    songPlaying.current = false;
  }

  function audioEnded() {
    //setSongState("Song ended");
    songStarted.current = false;
  }

  function handleAudio() {
    if (!songStarted.current) resetSong();
    else {
      if (!songPlaying.current) playAudio();
      else pauseAudio();
    }
    audioElement.onended = () => audioEnded();
  }

  return (
    <td id="image-element" style={{ display: currentImg }}>
      <div>
        <img src="images/minus.png" alt="Decrease Volume" />
        <img onClick={handleAudio} ref={imgElement} src={imgSrc} alt="" />
        <img src="images/plus.png" alt="Increase Volume" />
      </div>
      <div id="progress-bar-container">
        <div ref={progressBar} id="progress-bar"></div>
      </div>
    </td>
  );
}
