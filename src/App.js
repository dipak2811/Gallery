import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from "./components/Home";
import AlbumPicture from "./components/AlbumPictures";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="albums/:albumId" element={<AlbumPicture />} />
      </Routes>
    </>
  );
};

export default App;
