import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <div>
        <NavBar />
      </div>

      <div className="heroSection">
        <h6>Sobre el proyecto</h6>
        {/*Hero section here */}
      </div>
      <div>
        <h6>Juegos destacados</h6>
        {/*Carrousel here */}
      </div>
    </>
  );
}

export default App;
