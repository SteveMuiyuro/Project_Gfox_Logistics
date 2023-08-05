import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Trucks() {
  const [trucks, setTrucks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    fetch("api/trucks")
      .then((res) => res.json())
      .then((data) => setTrucks(data.trucks));
  }, []);

  const displayTrucks = typeFilter
    ? trucks.filter((truck) => typeFilter === truck.type)
    : trucks;

  const truckElements = displayTrucks.map((truck) => (
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

  return (
    <div className="trucks-heading">
      <h2>Explore our variety of trucks, and make a booking with us today!</h2>
      <div className="filters">
        <button
          onClick={() => setSearchParams({ type: "Trailer" })}
          className="trailer-filter"
        >
          Trailer
        </button>
        <button
          onClick={() => setSearchParams({ type: "Truck" })}
          className="truck-filter"
        >
          Truck
        </button>
        <button onClick={() => setSearchParams({})} className="clear-filter">
          Clear Filters
        </button>
      </div>
      <div className="truck-elements">{truckElements}</div>
    </div>
  );
}
