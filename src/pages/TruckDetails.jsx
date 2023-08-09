import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function TruckDetails() {
  const [truckData, setTruckData] = useState([]);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    async function truckDetails() {
      const res = await fetch(`/api/trucks/${params.id}`);
      if (!res.ok) {
        throw {
          message: "Truck not found",
          statusText: res.statusText,
          status: res.status,
        };
      }
      const data = await res.json();
      setTruckData(data.trucks);
    }

    truckDetails();
  }, [params.id]);

  const search = location.state?.search || "";

  return (
    <div className="truck-details">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>{`Back to ${location.state?.type || "all trucks"}`}</span>
      </Link>

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
