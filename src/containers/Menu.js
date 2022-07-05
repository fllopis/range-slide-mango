import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <nav style={{width: "960px", padding: "20px", margin: "20px auto", background: "#F5F5F5", boxShadow: "3px 3px 3px #ccc"}}>
        <Link to="/" style={{padding: "15px 20px"}}>Home</Link>
        <Link to="/exercise1" style={{padding: "15px 20px" }}>Exercise1</Link>
        <Link to="/exercise2" style={{padding: "15px 20px"}}>Exercise2</Link>
      </nav>
    </div>
  );
};

export default Menu;