import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Trucks from "../components/Trucks";
import TruckDetails from "../components/TruckDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <Link to="/" className="site-logo">
            GFox
          </Link>

          <nav className="sub-container">
            <Link to="/about" className="header-elements">
              About
            </Link>
            <Link to="/trucks" className="header-elements">
              Trucks
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/trucks/:id" element={<TruckDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
