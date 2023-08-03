import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TruckDetails() {
  const [truckData, setTruckData] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/trucks/${params.id}`)
      .then((res) => res.json())
      .then((data) => setTruckData(data.trucks));
  }, [params.id]);

  return (
    <div className="truck-details">
      {truckData ? (
        <>
          <img src={truckData.imageUrl} className="truck-image" />
          <p className="description">{truckData.description}</p>
          <p>
            Price/Day:
            {truckData.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p>Load Capacity: {truckData.load} Tonnes</p>
          <i className="type">{truckData.type}</i>
          <button className="hire-btn">Hire Truck</button>
        </>
      ) : (
        <p>Loading Data...</p>
      )}
    </div>
  );
}
