import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="main-container">
      <div className="details">
        <p>
          Scale your products with Gfox Logistics. Hire our Trucks, and Trailers
          today!
        </p>
        <div className="form-register">
          <p>Don't Have an Account?</p>
          <form action="" method="post" className="form">
            <input type="text" placeholder="Firstname" />
            <input type="text" placeholder="Lastname" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Confirm Password" />
            <button className="register">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
