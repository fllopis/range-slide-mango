import React from "react";
import { Link } from "react-router-dom";
import '../styles/style-menu.css';

const Menu = () => {
  return (
    <div>

      {/* TITLE / HEADER */}
      <div className="text-center mt-4">
        <img src={"../assets/imgs/logo.png"} width="250px" />
        <h1 className="title">Range Picker</h1>
      </div>

      {/* MAIN MENU NAVIGATION */}
      <nav className="menu__container">
        <Link to="/" className="trans-05">Home</Link>
        <Link to="/exercise1" className="trans-05">Exercise1</Link>
        <Link to="/exercise2" className="trans-05">Exercise2</Link>
      </nav>
    </div>
  );
};

export default Menu;