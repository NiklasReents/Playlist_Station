class FetchHandler {
  constructor(
    axios,
    playlistUrl,
    cookie,
    controller,
    setPlaylistData,
    imgUrl,
    setImgFile,
    songUrl,
    setSongFile
  ) {
    this.axios = axios;
    this.playlistUrl = playlistUrl;
    this.cookie = cookie;
    this.controller = controller;
    this.setPlaylistData = setPlaylistData;
    this.imgUrl = imgUrl;
    this.setImgFile = setImgFile;
    this.songUrl = songUrl;
    this.setSongFile = setSongFile;
  }

  async fetchData(url, method, decode) {
    const response = await this.axios({
      url: url,
      method: method,
      headers: url === this.playlistUrl && {
        authorization: this.cookie.get("PLSJwt"),
      },
      responseType: decode,
      signal: this.controller.signal,
    });
    return response.data;
  }

  fetchList = () => {
    this.fetchData(this.playlistUrl, "get", "json")
      .then((json) => this.setPlaylistData(json))
      .catch((err) => console.error(err));
  };

  fetchImage = () => {
    this.fetchData(this.imgUrl, "get", "blob")
      .then((img) => {
        const fileUrl = URL.createObjectURL(img);
        this.setImgFile(fileUrl);
      })
      .catch((err) => console.error(err));
  };

  fetchSong = () => {
    this.fetchData(this.songUrl, "get", "blob")
      .then((song) => {
        const fileUrl = URL.createObjectURL(song);
        this.setSongFile(fileUrl);
      })
      .catch((err) => console.error(err));
  };
}

export { FetchHandler };
