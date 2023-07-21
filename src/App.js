import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import AlbumPicture from "./components/AlbumPictures";
import Navbar from "./components/Navbar";
import AuthPrivateRoute from "./Auth/AuthPrivateRoute";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import PrivateRoute from "./Auth/PrivateRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="login"
          element={
            <AuthPrivateRoute>
              <Login />
            </AuthPrivateRoute>
          }
        />
        <Route
          path="Register"
          element={
            <AuthPrivateRoute>
              <Register  />
            </AuthPrivateRoute>
          }
        />
        <Route
          path="albums/:albumId"
          element={
            <PrivateRoute>
              <AlbumPicture />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
