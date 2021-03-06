import React from "react";

import "../styles/Userform.css";

export default function UserForm(props) {
  const {
    sendUserData,
    loginDisplay,
    getFormData,
    inputTypeName,
    namePlaceholder,
    nameValue,
    passwordPlaceholder,
    passwordValue,
    emailPlaceholder,
    emailValue,
    emailButton,
  } = props;

  return (
    <div>
      <form
        onSubmit={sendUserData}
        style={{ visibility: !loginDisplay ? "visible" : "hidden" }}
      >
        <input
          onChange={getFormData}
          name="name"
          type={inputTypeName}
          placeholder={namePlaceholder}
          value={nameValue}
          required
        />
        <input
          onChange={getFormData}
          name="password"
          type="password"
          placeholder={passwordPlaceholder}
          value={passwordValue}
          required
        />
        <input type="submit" value="Send Data" />
        <div>
          {emailPlaceholder ? (
            <input
              onChange={getFormData}
              name="email"
              type="email"
              placeholder={emailPlaceholder}
              value={emailValue}
              required
            />
          ) : (
            emailButton
          )}
        </div>
      </form>
    </div>
  );
}
