import React from "react";
import { Link } from "react-router-dom";
import '../styles/style-menu.css';

const Menu = () => {
  return (
    <div>

      {/* TITLE / HEADER */}
      <h1 className="title">Mango Range Picker</h1>
      {/* <img src={require("../assets/imgs/logo.jpg")} /> */}

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