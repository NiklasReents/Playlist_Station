import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import UserFormHead from "./UserFormHead.js";
import UserForm from "./UserForm.js";

export default function Login(props) {
  const { setUsername } = props;
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const loginUrl = "http://localhost:2000/login";
  const reqBody = {
    loginName: loginName,
    password: password,
  };
  const controller = new AbortController();
  const cookie = new Cookies();

  useEffect(() => {
    return () => controller.abort();
  }, []);

  function login(data) {
    cookie.set("PLSJwt", data[0]);
    localStorage.setItem("loginData", data[1]);
    setMessage(data[2]);
    setUsername(localStorage.getItem("loginData"));
  }

  function logout() {
    cookie.remove("PLSJwt");
    localStorage.removeItem("loginData");
    setMessage("Logged out!");
    setUsername("User");
  }

  async function sendLoginData(e) {
    e.preventDefault();
    setMessage("...Pending...");
    await axios
      .post(loginUrl, reqBody, { signal: controller.signal })
      .then((res) => {
        if (Array.isArray(res.data)) {
          login(res.data);
          setLoginName("");
          setPassword("");
        } else setMessage(res.data);
      })
      .catch((err) => {
        setMessage(
          err.message === "Network Error"
            ? "Not connected to the server!"
            : "Request aborted"
        );
      });
  }

  function getFormData(e) {
    if (e.target.name === "name") {
      setLoginName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  return (
    <tr id="login" className="userform">
      <td>
        <UserFormHead
          loggedIn={cookie.get("PLSJwt")}
          title="Login"
          logout={logout}
          message={message}
        />
        <UserForm
          sendUserData={sendLoginData}
          loginDisplay={cookie.get("PLSJwt")}
          getFormData={getFormData}
          inputTypeName="text"
          namePlaceholder="Type in your name"
          nameValue={loginName}
          passwordPlaceholder="Type in your password"
          passwordValue={password}
        />
      </td>
    </tr>
  );
}
