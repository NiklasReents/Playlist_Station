class FetchHandler {
  constructor(axios, playlistUrl, cookie, controller, setPlaylistData) {
    this.axios = axios;
    this.playlistUrl = playlistUrl;
    this.cookie = cookie;
    this.controller = controller;
    this.setPlaylistData = setPlaylistData;
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
}

export { FetchHandler };
