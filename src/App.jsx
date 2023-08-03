import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Trucks from "./pages/Trucks";
import TruckDetails from "./pages/TruckDetails";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./host/Dashboard";
import Income from "./host/Income";
import Reviews from "./host/Reviews";
import "./server";
import HostLayout from "./components/HostLayout ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="trucks" element={<Trucks />} />
          <Route path="trucks/:id" element={<TruckDetails />} />
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
