import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Exercice1 from "./Exercice1";
import Exercice2 from "./Exercice2";

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/exercice1" style={{marginRight:"20px"}}>Exercice1</Link>
        <Link to="/exercice2">Exercice2</Link>
      </nav>
    </>
  );
}

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exercice1" element={<Exercice1 />} />
        <Route path="exercice2" element={<Exercice2 />} />
      </Routes>
    </div>
  );
};

export default App;