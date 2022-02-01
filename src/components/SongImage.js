import React, { useRef, useEffect } from "react";

export default function SongImage(props) {
  const { audioElement, /*setSongState,*/ currentImg, imgSrc } = props;
  const songStarted = useRef(false);
  const songPlaying = useRef(false);
  const progressBar = useRef();
  const imgElement = useRef();

  useEffect(() => {
    songStarted.current = false;
    songPlaying.current = false;
    resetAnimation();
  }, [currentImg]);

  function resetAnimation() {
    progressBar.current.style.animation = "none";
    imgElement.current.style.animation = "none";
  }

  function startAnimation() {
    progressBar.current.style.animationDuration = audioElement.duration + "s";
    imgElement.current.style.animationPlayState = "running";
    progressBar.current.style.animationPlayState = "running";
  }

  function suspendAnimation() {
    imgElement.current.style.animationPlayState = "paused";
    progressBar.current.style.animationPlayState = "paused";
  }

  function resetSong() {
    resetAnimation();
    songStarted.current = true;
    setTimeout(() => {
      progressBar.current.style.animation = "";
      imgElement.current.style.animation = "";
      handleAudio();
    }, 100);
  }

  async function playAudio() {
    await audioElement.play();
    startAnimation();
    //setSongState("Song playing");
    songPlaying.current = true;
  }

  async function pauseAudio() {
    await audioElement.pause();
    suspendAnimation();
    //setSongState("Song suspended");
    songPlaying.current = false;
  }

  function audioEnded() {
    suspendAnimation();
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

  function decreaseVolume() {
    audioElement.volume = parseFloat(audioElement.volume.toFixed(1));
    if (audioElement.currentTime === 0) return;
    else if (audioElement.volume > 0.0) {
      audioElement.volume -= 0.1;
    } else audioElement.volume = 0.0;
  }

  function increaseVolume() {
    audioElement.volume = parseFloat(audioElement.volume.toFixed(1));
    if (audioElement.currentTime === 0) return;
    else if (audioElement.volume < 1.0) {
      audioElement.volume += 0.1;
    } else audioElement.volume = 1.0;
  }

  return (
    <td id="image-element" style={{ display: currentImg }}>
      <div>
        <img
          onClick={decreaseVolume}
          src="images/minus.png"
          alt="Decrease Volume"
        />
        <img onClick={handleAudio} ref={imgElement} src={imgSrc} alt="" />
        <img
          onClick={increaseVolume}
          src="images/plus.png"
          alt="Increase Volume"
        />
      </div>
      <div id="progress-bar-container">
        <div ref={progressBar} id="progress-bar"></div>
      </div>
    </td>
  );
}
