import React, { useState, useRef, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";

import UserFormHead from "./UserFormHead.js";
import UserForm from "./UserForm.js";

export default function PasswordReset(props) {
  const { setTokenFound } = props;
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const timeOut = useRef(0);
  const loc = useLocation();
  const deleteTokenUrl = "http://localhost:2000/sendmail/delete";
  const resetPWUrl = "http://localhost:2000/login/passwordreset";
  const email = loc.state[1];
  const tokenPath = loc.state[0];
  const reqBody = {
    password: password,
    passwordConfirmed: passwordConfirmed,
    email: email,
  };
  const controller = new AbortController();

  useEffect(() => {
    return () => {
      deleteToken();
      controller.abort();
      clearTimeout(timeOut.current);
    };
  }, []);

  function deleteToken() {
    axios
      .delete(deleteTokenUrl + "/" + tokenPath)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    setTokenFound(false);
  }

  function sendPassword(e) {
    e.preventDefault();
    setMessage("...Pending...");
    axios
      .put(resetPWUrl, reqBody, { signal: controller.signal })
      .then((res) => {
        setMessage(res.data);
        if (res.data.includes(email)) {
          timeOut.current = setTimeout(() => setRedirect(true), 2000);
        }
      })
      .catch((err) => {
        setMessage(
          err.message === "Network Error"
            ? "Not connected to the server!"
            : "Request aborted!"
        );
        timeOut.current = setTimeout(() => setRedirect(true), 2000);
      });
  }

  function getFormData(e) {
    if (e.target.name === "name") {
      setPassword(e.target.value);
    } else if (e.target.name === "password") {
      setPasswordConfirmed(e.target.value);
    }
  }

  return !redirect ? (
    <tr id="password-reset" className="userform">
      <td>
        <UserFormHead title="Reset Password" message={message} />
        <UserForm
          sendUserData={sendPassword}
          getFormData={getFormData}
          inputTypeName="password"
          namePlaceholder="Type in a new password"
          nameValue={password}
          passwordPlaceholder="Reenter new password"
          passwordValue={passwordConfirmed}
        />
      </td>
    </tr>
  ) : (
    <Navigate to="/login" />
  );
}
