import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function HostLayout() {
  const isActiveStyles = {
    color: "#fb923c",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <>
      <nav className="host-navs">
        <NavLink
          to="."
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Income
        </NavLink>
        <NavLink
          to="trucks"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Trucks
        </NavLink>
        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
          className="reviews"
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
