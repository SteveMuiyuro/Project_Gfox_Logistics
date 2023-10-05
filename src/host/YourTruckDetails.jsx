import React, { useState, useEffect } from "react";
import { useOutletContext, Link, useParams } from "react-router-dom";
import trucksFinder from "../../trucksFinder";
export default function YourTruckDetails() {
  const [truckData, setTruckData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function truckDetails() {
      setLoading(true);
      try {
        const data = await trucksFinder.get(`/${id}`);
        setTruckData(data.data.truckInfo[0]);
        setReviews(data.data.reviews);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    truckDetails();
  }, [id]);

  console.log(truckData);
  return truckData ? (
    <>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all trucks</span>
      </Link>

      <div className="host-truck-details">
        <p>
          <span>Name: </span>
          {truckData.truck_name}
        </p>
        <p>
          <span>Catergory: </span>
          {truckData.type}
        </p>
        <p>
          <span>Description: </span>
          {truckData.truck_description}
        </p>
        <p>
          <span>Load Capacity: </span>
          {truckData.tonnage}
        </p>
        <div className="action-buttons">
          <Link className="update-truck">Update Truck</Link>
          <button className="delete-truck">Delete Truck</button>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}
