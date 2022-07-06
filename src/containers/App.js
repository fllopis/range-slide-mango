import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Home from "../pages/Home";
import Exercise1 from "../pages/Exercise1";
import Exercise2 from "../pages/Exercise2";

const App = () => {
  return (
    <div style={{width: "960px", margin: "20px auto",}}>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exercise1" element={<Exercise1 />} />
        <Route path="exercise2" element={<Exercise2 />} />
      </Routes>
    </div>
  );
};

export default App;