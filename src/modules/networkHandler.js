class NetworkHandler {
  constructor(
    cookie,
    setUsername,
    userLoggedIn,
    setFormDisabled,
    playlistData,
    playlistIndex,
    setBodyState,
    setStatusMessage,
    resStatus,
    pending,
    renderPlaylist
  ) {
    this.cookie = cookie;
    this.setUsername = setUsername;
    this.userLoggedIn = userLoggedIn;
    this.setFormDisabled = setFormDisabled;
    this.playlistData = playlistData;
    this.playlistIndex = playlistIndex;
    this.setBodyState = setBodyState;
    this.setStatusMessage = setStatusMessage;
    this.resStatus = resStatus;
    this.pending = pending;
    this.renderPlaylist = renderPlaylist;
  }

  checkWebStorage = () => {
    if (!localStorage.getItem("loginData") && this.cookie.get("PLSJwt")) {
      this.cookie.remove("PLSJwt");
      this.setUsername("User");
    } else if (
      localStorage.getItem("loginData") &&
      !this.cookie.get("PLSJwt")
    ) {
      localStorage.removeItem("loginData");
      this.setUsername("User");
    }
  };

  checkLoginStatus = () => {
    if (localStorage.getItem("loginData") && this.cookie.get("PLSJwt")) {
      this.userLoggedIn.current = true;
    } else this.userLoggedIn.current = false;
  };

  connected = () => {
    if (this.userLoggedIn.current) {
      this.setFormDisabled(false);
      if (!this.playlistData || !this.playlistData[this.playlistIndex]) {
        this.setBodyState("Create new playlists!");
      }
    } else if (!this.userLoggedIn.current) {
      this.setFormDisabled(true);
      this.setStatusMessage("You must be logged in to submit a form!");
      this.setBodyState("No playlists found. Log in to create one!");
    }
  };

  disconnected = () => {
    this.setFormDisabled(true);
    this.setStatusMessage("You are not connected to the server!");
    this.setBodyState("...Not connected...");
  };

  checkConnection = () => {
    if (this.resStatus === "OK") this.connected();
    else if (!this.resStatus || this.resStatus === "Network Error") {
      this.disconnected();
    }
  };

  bodyStatus = () => {
    if (!this.playlistData || !this.playlistData[this.playlistIndex]) {
      return this.pending;
    } else return this.renderPlaylist();
  };
}

export { NetworkHandler };
