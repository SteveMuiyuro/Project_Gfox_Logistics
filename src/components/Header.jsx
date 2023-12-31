import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const [logout, setLogout] = React.useState(true);

  const isActiveStyles = {
    backgroundColor: "#18181b",
    color: "#ffedd5",
    borderRadius: "0.3em",
  };

  function logoutFun() {
    setLogout(localStorage.removeItem("loggedin"));
  }

  return (
    <section className="header">
      <header>
        <Link to="/" className="site-logo">
          <img src="/assets/gfox_logo.png" alt="" className="logo" />
        </Link>

        <nav className="sub-container">
          <NavLink
            to="/host"
            className="header-elements"
            style={({ isActive }) => (isActive ? isActiveStyles : null)}
          >
            Dashboard
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
            Truck Listings
          </NavLink>
          <NavLink
            to="/login"
            className="header-elements"
            style={({ isActive }) => (isActive ? isActiveStyles : null)}
          >
            Login
          </NavLink>

          {!logout && (
            <button className="logout-btn" onClick={logoutFun}>
              Logout
            </button>
          )}

          {/* {logout && (
            <NavLink
              to="/login"
              className="header-elements"
              style={({ isActive }) => (isActive ? isActiveStyles : null)}
            >
              Login
            </NavLink>
          )} */}
        </nav>
      </header>
    </section>
  );
}
