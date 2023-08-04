import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
export default function YourTruckDetails() {
  const params = useParams();

  const [truck, setTruck] = useState(null);
  useEffect(() => {
    fetch(`/api/host/trucks/${params.id}`)
      .then((res) => res.json())
      .then((data) => setTruck(data.trucks));
  }, [params.id]);

  console.log(truck);
  return truck ? (
    <div className="host-truck-container">
      <div className="host-truck">
        <img src={truck.imageUrl} />
        <div className="host-truck-details">
          <p className="host-truck-type">{truck.type}</p>
          <p>{truck.name}</p>
          <p>
            {truck.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>
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
    </div>
  ) : (
    <p>Loading...</p>
  );
}
