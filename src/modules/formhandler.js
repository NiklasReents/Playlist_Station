class FormHandler {
  constructor(imgRef, setImgValue, setImgLabel, audioRef, setAudioLabel) {
    this.imgRef = imgRef;
    this.setImgValue = setImgValue;
    this.setImgLabel = setImgLabel;
    this.audioRef = audioRef;
    this.setAudioLabel = setAudioLabel;
  }

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

  validateAudioUpload = () => {
    const audioExt = /(\.ogg|\.mp3)$/i;
    if (!audioExt.exec(this.audioRef.current.value)) {
      this.audioRef.current.value = "";
      this.setAudioLabel("Wrong format. Allowed: .ogg or .mp3 file.");
    } else this.setAudioLabel("Audio file added!");
  };
}

export { FormHandler };
