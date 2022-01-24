import React, { useState, useRef, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import "./styles/App.css";

export default function App() {
  return (
    <table id="app">
      <thead>
        <tr>
          <th>Head</th>
        </tr>
      </thead>
      <tbody>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <tr>
                <td>Form</td>
              </tr>
            }
          />
          <Route
            path="/playlists"
            element={
              <tr>
                <td>Playlists</td>
              </tr>
            }
          />
          <Route
            path="/register"
            element={
              <tr>
                <td>Register</td>
              </tr>
            }
          />
          <Route
            path="/login"
            element={
              <tr>
                <td>Login</td>
              </tr>
            }
          />
          <Route
            path="/:tokenPath"
            element={
              <tr>
                <td>ReceiveMail</td>
              </tr>
            }
          />
          <Route
            path="passwordreset"
            element={
              <tr>
                <td>PasswordReset</td>
              </tr>
            }
          />
        </Routes>
      </tbody>
      <tfoot>
        <tr>
          <th>Foot</th>
        </tr>
      </tfoot>
    </table>
  );
}
