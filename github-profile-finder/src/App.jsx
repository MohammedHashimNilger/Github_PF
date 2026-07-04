import { useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="favorite" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
