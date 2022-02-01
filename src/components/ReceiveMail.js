import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import axios from "axios";

import Pending from "./Pending.js";

export default function ReceiveMail(props) {
  const { setTokenFound, tokenFound } = props;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("...Redirecting...");
  const [redirect, setRedirect] = useState(false);
  const timeOut = useRef(0);
  const loc = useLocation();
  const { tokenPath } = useParams();
  const sendMailUrl = "http://localhost:2000/sendmail";
  const controller = new AbortController();

  useEffect(() => {
    axios
      .get(sendMailUrl + "/" + tokenPath, {
        signal: controller.signal,
      })
      .then((res) => {
        if (res.data.token === tokenPath) {
          setTokenFound(true);
          setEmail(loc.search.slice(loc.search.search("=") + 1));
        } else {
          setTokenFound(false);
          setMessage("No valid access token provided!");
        }
        timeOut.current = setTimeout(() => setRedirect(true), 1500);
      })
      .catch((err) => {
        setMessage(
          err.message === "Network Error"
            ? "Not connected to the server!"
            : "Request aborted!"
        );
        timeOut.current = setTimeout(() => setRedirect(true), 1500);
      });
    return () => {
      controller.abort();
      clearTimeout(timeOut.current);
    };
  }, []);

  return !redirect ? (
    <Pending bodyState={message} />
  ) : (
    <Navigate
      to={tokenFound ? "/passwordreset" : "/"}
      state={tokenFound ? [tokenPath, email] : null}
    />
  );
}
