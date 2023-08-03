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
          to="/host"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/host/income"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Income
        </NavLink>
        <NavLink
          to="/host/reviews"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
