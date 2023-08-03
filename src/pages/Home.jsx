import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="main-container">
      <div className="details">
        <p>
          Want your products to scale without breaking the bank?
          <br />
          Gfox Logistics got you.
        </p>
        <Link to="/trucks" className="checkout-btn">
          Checkout our Trucks
        </Link>
      </div>
    </div>
  );
}
