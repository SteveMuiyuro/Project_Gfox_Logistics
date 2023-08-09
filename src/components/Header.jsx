import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const isActiveStyles = {
    backgroundColor: "#18181b",
    color: "#ffedd5",
  };

  return (
    <header>
      <Link to="/" className="site-logo">
        GFox
      </Link>

      <nav className="sub-container">
        <NavLink
          to="/host"
          className="header-elements"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className="header-elements"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/trucks"
          className="header-elements"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Trucks
        </NavLink>

        <NavLink
          to="/login"
          className="header-elements"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}
