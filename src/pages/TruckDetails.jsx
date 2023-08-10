import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import { getTruck } from "../../api";

export default function TruckDetails() {
  const [truckData, setTruckData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    async function truckDetails() {
      setLoading(true);
      try {
        const data = await getTruck(id);
        setTruckData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    truckDetails();
  }, [id]);

  const search = location.state?.search || "";

  if (loading) {
    return <p>Loading Data...</p>;
  }

  if (error) {
    <h2>There was an error whiel fetching data:{error.message}</h2>;
  }
  return (
    <div className="truck-details">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>{`Back to ${location.state?.type || "all trucks"}`}</span>
      </Link>

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
    </div>
  );
}
