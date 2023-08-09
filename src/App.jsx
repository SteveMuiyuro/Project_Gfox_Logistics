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
import YourTrucks from "./host/YourTrucks";
import YourTruckDetails from "./host/YourTruckDetails";
import TruckDetailsLayout from "./components/TruckDetailsLayout";
import Pricing from "./host/Pricing";
import Photos from "./host/Photos";
import Page404 from "./pages/Page404";
import Authenticated from "./components/Authenticated";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="trucks" element={<Trucks />} />
          <Route path="trucks/:id" element={<TruckDetails />} />
          <Route path="login" element={<Login />} />
          <Route element={<Authenticated />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="trucks" element={<YourTrucks />} />
              <Route path="trucks/:id" element={<TruckDetailsLayout />}>
                <Route index element={<YourTruckDetails />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="photos" element={<Photos />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
