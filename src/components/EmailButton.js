import React, { useEffect } from "react";
import axios from "axios";

export default function EmailButton(props) {
  const {
    loginName,
    setShowButton,
    setMailMessage,
    setEmail,
    email,
    showButton,
    mailMessage,
  } = props;
  const getUserUrl = "http://localhost:2000/login/getuser";
  const sendMailUrl = "http://localhost:2000/sendmail";
  const controller = new AbortController();

  useEffect(() => {
    if (loginName) getLoginName();
    return () => controller.abort();
  }, [loginName]);

  async function getLoginName() {
    await axios
      .post(getUserUrl, { loginName: loginName })
      .then((res) => {
        if (res.data.username === loginName) {
          setShowButton(true);
          setMailMessage("");
          setEmail(res.data.email);
        } else {
          setShowButton(false);
          setMailMessage("");
        }
      })
      .catch((err) => {
        setShowButton(false);
        setMailMessage(
          err.message === "Network Error"
            ? "Not connected to the server!"
            : "Request aborted!"
        );
      });
  }

  async function sendEmail(e) {
    e.preventDefault();
    await axios
      .post(sendMailUrl, { email: email }, { signal: controller.signal })
      .then((res) => setMailMessage(res.data))
      .catch((err) =>
        setMailMessage(
          err.message === "Network Error"
            ? "Not connected to the server!"
            : "Failed to send email!"
        )
      );
  }

  return (
    <div>
      <button
        onClick={sendEmail}
        style={{
          visibility: !showButton ? "hidden" : "visible",
        }}
      >
        Forgot password?
      </button>
      {mailMessage && <span id="mail-button">{mailMessage}</span>}
    </div>
  );
}
