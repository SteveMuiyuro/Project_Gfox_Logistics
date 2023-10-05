import React, { useEffect, useState } from "react";
import { getHostTrucks } from "../../api";
import trucksFinder from "../../trucksFinder";
import StarRating from "../components/StarRating";

export default function Dashboard() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchTrucks() {
      setLoading(true);
      try {
        const data = await trucksFinder.get("/");
        setTrucks(data.data.trucks);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrucks();
  }, []);

  if (loading) {
    return <h2>Loading Data...</h2>;
  }

  if (error) {
    return <h2>encountered an Error while fetching data:{error.message}</h2>;
  }

  const elements = trucks?.map((truck) => (
    <div className="dashboard-container" key={truck.id}>
      <div>
        <h2>{truck.truck_name}</h2>
        <img src={truck.truck_image} className="dashboard-image" />
      </div>

      <div>
        <p>Load Capacity: {truck.tonnage}</p>
      </div>

      <div>
        <h3>Description:</h3>
        <p>{truck.truck_description}</p>
        <span>Average Rating:</span>
        <StarRating rating={truck.average_rating} />
      </div>
    </div>
  ));
  return <div className="all-dashboard-items">{elements}</div>;
}
