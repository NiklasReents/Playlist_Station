class FormHandler {
  constructor(
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
  ) {
    this.urlBoxRef = urlBoxRef;
    this.setUrlParameterBox = setUrlParameterBox;
    this.imgRef = imgRef;
    this.setImgValue = setImgValue;
    this.setImgLabel = setImgLabel;
    this.audioRef = audioRef;
    this.setAudioLabel = setAudioLabel;
    this.urlBox = urlBox;
    this.imgUrl = imgUrl;
    this.setImgButtonContent = setImgButtonContent;
  }

  removeParameterBox = (e) => {
    if (!this.urlBoxRef.current.contains(e.target)) {
      this.setUrlParameterBox(<></>);
    }
  };

  validateImageUpload = () => {
    const imgExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (this.imgRef.current.type === "file") {
      if (!imgExt.exec(this.imgRef.current.value)) {
        this.setImgValue("");
        this.setImgLabel("Wrong format. Allowed: .jpg, .jpeg, .png, .gif.");
      } else {
        this.setImgValue(this.imgRef.current.value);
        this.setImgLabel("Image file added!");
      }
    }
  };

  removeFile = (e) => {
    e.preventDefault();
    if (e.target.name === "img-btn") {
      if (this.imgRef.current.type === "file") {
        this.setImgValue("");
        this.setImgLabel("Add an image file.");
      }
    } else {
      this.audioRef.current.value = "";
      this.setAudioLabel("Add an audio file.");
    }
  };

  displayParameterBox = () => {
    if (this.imgRef.current.type === "text") {
      this.setUrlParameterBox(this.urlBox);
    }
  };

  showUrlField = () => {
    this.imgRef.current.type = "text";
    this.imgRef.current.readOnly = true;
    this.setImgValue(this.imgUrl);
    this.setImgButtonContent("O");
    this.setImgLabel("Add an image url.");
  };

  showFileField = () => {
    this.imgRef.current.type = "file";
    this.imgRef.current.readOnly = false;
    this.setUrlParameterBox(<></>);
    this.setImgValue("");
    this.setImgButtonContent("X");
    this.setImgLabel("Add an image file.");
  };

  switchInput = (e) => {
    e.preventDefault();
    if (this.imgRef.current.type === "file") {
      this.showUrlField();
    } else this.showFileField();
  };

  validateAudioUpload = () => {
    const audioExt = /(\.ogg|\.mp3)$/i;
    if (!audioExt.exec(this.audioRef.current.value)) {
      this.audioRef.current.value = "";
      this.setAudioLabel("Wrong format. Allowed: .ogg or .mp3 file.");
    } else this.setAudioLabel("Audio file added!");
  };
}

export { FormHandler };
