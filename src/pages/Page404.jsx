import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="error-page">
      <h1>Sorry! The page you are looking for was not found.</h1>
      <Link to="/" className="back-to-home-btn">
        Return Home
      </Link>
    </div>
  );
}
