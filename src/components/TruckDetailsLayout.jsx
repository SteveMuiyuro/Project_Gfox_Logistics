import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import YourTruckDetails from "../host/YourTruckDetails";
export default function TruckDetailsLayout() {
  const isActiveStyles = {
    color: "#fb923c",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <>
      <nav className="truck-navigation">
        <NavLink
          to="."
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
          end
        >
          Details
        </NavLink>
        <NavLink
          to="pricing"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Pricing
        </NavLink>
        <NavLink
          to="photos"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Photos
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
