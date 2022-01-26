import React, { useState, useEffect } from "react";
import axios from "axios";

import UserFormHead from "./UserFormHead.js";
import UserForm from "./UserForm.js";

export default function Register() {
  const [registerName, setRegisterName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const registerUrl = "http://localhost:2000/register";
  const reqBody = {
    registerName: registerName,
    password: password,
    email: email,
  };
  const controller = new AbortController();

  useEffect(() => {
    return () => controller.abort();
  }, []);

  async function sendRegisterData(e) {
    e.preventDefault();
    setMessage("...Pending...");
    await axios
      .post(registerUrl, reqBody, { signal: controller.signal })
      .then((res) => {
        if (res.data.includes(registerName)) {
          setMessage(res.data);
          setRegisterName("");
          setPassword("");
          setEmail("");
        } else setMessage(res.data);
      })
      .catch((err) => {
        setMessage(
          err.message === "Network Error"
            ? "Not connected to the server!"
            : "Request aborted!"
        );
      });
  }

  function getFormData(e) {
    if (e.target.name === "name") {
      setRegisterName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else setEmail(e.target.value);
  }

  return (
    <tr id="register" className="userform">
      <td>
        <UserFormHead title="Register" message={message} />
        <UserForm
          sendUserData={sendRegisterData}
          getFormData={getFormData}
          inputTypeName="text"
          namePlaceholder="Type in a new name"
          nameValue={registerName}
          passwordPlaceholder="Type in a new password"
          passwordValue={password}
          emailPlaceholder="Type in a new email address"
          emailValue={email}
        />
      </td>
    </tr>
  );
}
