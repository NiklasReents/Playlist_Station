class RouteHandler {
  constructor(
    loc,
    arrow,
    audioElement,
    songPath,
    currentImage,
    setCurrentSong,
    setSongState
  ) {
    this.loc = loc;
    this.arrow = arrow;
    this.audioElement = audioElement;
    this.songPath = songPath;
    this.currentImage = currentImage;
    this.setCurrentSong = setCurrentSong;
    this.setSongState = setSongState;
  }

  setArrow = () => {
    if (this.loc.pathname !== "/") {
      this.arrow.current.style.transform = "rotateY(180deg)";
    } else this.arrow.current.style.transform = "rotateX(180deg)";
  };

  resetImages = () => {
    this.audioElement.load();
    this.songPath.current = "";
    this.currentImage.fill("none");
    this.setCurrentSong(null);
    this.setSongState(null);
  };
}

export { RouteHandler };
