class ImageHandler {
  constructor(
    ind,
    renderPlaylist,
    currentImg,
    imgPath,
    songPath,
    setCurrentImg,
    setCurrentSong,
    setSongState,
    imgDisplayed
  ) {
    this.ind = ind;
    this.renderPlaylist = renderPlaylist;
    this.currentImg = currentImg;
    this.imgPath = imgPath;
    this.songPath = songPath;
    this.setCurrentImg = setCurrentImg;
    this.setCurrentSong = setCurrentSong;
    this.setSongState = setSongState;
    this.imgDisplayed = imgDisplayed;
  }

  closeImages = () => {
    let i = 0;
    let len = this.renderPlaylist().length;
    for (i; i < len; i++) {
      const props = this.renderPlaylist()[i].props;
      if (props.index !== this.ind) {
        this.currentImg[i] = "none";
      }
    }
  };

  openImage = () => {
    const props = this.renderPlaylist()[this.ind].props;
    this.imgPath.current = props.imgStr.slice(
      props.imgStr.lastIndexOf("\\") + 1
    );
    this.songPath.current = props.audioStr.slice(
      props.audioStr.lastIndexOf("\\") + 1
    );
    this.currentImg[this.ind] = "block";
    this.setCurrentImg(this.currentImg);
    this.setCurrentSong(props.name);
    this.setSongState(null);
  };

  closeImage = () => {
    this.songPath.current = "";
    this.currentImg[this.ind] = "none";
    this.setCurrentImg(this.currentImg);
    this.setCurrentSong(null);
    this.setSongState(null);
  };

  toggleImage = () => {
    if (!this.imgDisplayed.current || this.currentImg[this.ind] === "none") {
      this.closeImages(this.ind);
      this.openImage(this.ind);
      this.imgDisplayed.current = true;
    } else {
      this.closeImage(this.ind);
      this.imgDisplayed.current = false;
    }
  };
}

export { ImageHandler };
