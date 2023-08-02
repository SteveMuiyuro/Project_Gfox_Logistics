import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../src/server";

export default function TruckDetails() {
  const [truckData, setTruckData] = useState(data);
  const params = useParams();

  const truckDetails = truckData.map((truck) =>
    truck.id === params.id ? (
      <div className="truck-details">
        <img src={truck.imageUrl} className="truck-image" />
        <p className="description">{truck.description}</p>
        <p>
          Price/Day:
          {truck.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p>Load Capacity: {truck.load} Tonnes</p>
        <i className="type">{truck.type}</i>
        <button className ="hire-btn">Hire Truck</button>
      </div>
    ) : null
  );

  return <div>{truckDetails}</div>;
}
