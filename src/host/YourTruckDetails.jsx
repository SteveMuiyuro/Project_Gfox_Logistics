import React from "react";
import { useOutletContext, Link } from "react-router-dom";
export default function YourTruckDetails() {
  const { truck } = useOutletContext();

  return truck ? (
    <>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all trucks</span>
      </Link>

      <div className="host-truck-details">
        <p>
          <span>Name: </span>
          {truck.name}
        </p>
        <p>
          <span>Catergory: </span>
          {truck.type}
        </p>
        <p>
          <span>Description: </span>
          {truck.description}
        </p>
        <p>
          <span>Load Capacity: </span>
          {truck.load}
        </p>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}
