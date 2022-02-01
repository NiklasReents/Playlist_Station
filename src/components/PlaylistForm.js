import React from "react";

import "../styles/Form.css";

export default function PlaylistForm(props) {
  const {
    sendForm,
    formDisabled,
    imgLabel,
    urlBoxRef,
    urlParameterBox,
    validateImageUpload,
    imgRef,
    imgValue,
    removeFile,
    displayParameterBox,
    imgButtonContent,
    switchInput,
    audioLabel,
    validateAudioUpload,
    audioRef,
    messageBox,
  } = props;

  return (
    <form
      onSubmit={sendForm}
      id="playlist-form"
      action="http://localhost:2000/playlists"
      method="post"
      encType="multipart/form-data"
    >
      <input
        name="playlistname"
        type="text"
        placeholder="Create new playlist/add songs"
        required
        disabled={formDisabled}
      />
      <div>
        <label htmlFor="imagefile">
          <b>{imgLabel}</b>
        </label>
        <div ref={urlBoxRef}>{urlParameterBox}</div>
        <input
          onChange={validateImageUpload}
          ref={imgRef}
          id="imagefile"
          name="imagefile"
          type="file"
          value={imgValue}
          required
          disabled={formDisabled}
        />
        <button
          onClick={removeFile}
          onMouseOver={displayParameterBox}
          name="img-btn"
          disabled={formDisabled}
        >
          {imgButtonContent}
        </button>
        <button onClick={switchInput} name="switch-btn" disabled={formDisabled}>
          <img src="images/repeat.png" alt="Switch Input" />
        </button>
      </div>
      <div>
        <label htmlFor="songfile">
          <b>{audioLabel}</b>
        </label>
        <input
          onChange={validateAudioUpload}
          ref={audioRef}
          id="songfile"
          name="songfile"
          type="file"
          required
          disabled={formDisabled}
        />
        <button onClick={removeFile} name="aud-btn" disabled={formDisabled}>
          X
        </button>
      </div>
      <input
        name="song"
        type="text"
        placeholder="Song"
        required
        disabled={formDisabled}
      />
      <input
        name="artist"
        type="text"
        placeholder="Artist"
        required
        disabled={formDisabled}
      />
      <input
        name="genre"
        type="text"
        placeholder="Genre"
        required
        disabled={formDisabled}
      />
      <div>
        <input type="submit" value="Send Data" />
        <div>{messageBox}</div>
      </div>
    </form>
  );
}
