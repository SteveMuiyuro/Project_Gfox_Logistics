import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { data } from "../src/server";
export default function Trucks() {
  const [trucks, setTrucks] = useState([data]);

  const truckElements = data.map((truck) => (
    <div key={truck.id} className="truck">
      <Link to={`/trucks/${truck.id}`}>
        <img src={truck.imageUrl} className="truck-image" />
        <div>
          <h3>{truck.name}</h3>
          <p>
            Price/Day:{" "}
            {truck.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p>Tonnage: {truck.load}</p>
          <i className="type">{truck.type}</i>
        </div>
      </Link>
    </div>
  ));

  console.log(trucks);
  return (
    <div className="trucks-heading">
      <h2>Explore our variety of trucks, and make a booking with us today!</h2>
      <div className="truck-elements">{truckElements}</div>
    </div>
  );
}
