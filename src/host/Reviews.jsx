import React, { useState } from "react";
import { useEffect } from "react";
import { getHostTrucks } from "../../api";
import trucksFinder from "../../trucksFinder";

export default function Reviews() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      setLoading(true);
      try {
        const data = await getHostTrucks();
        setTrucks(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, []);

  if (loading) {
    return <h2>Loading Data...</h2>;
  }

  if (error) {
    return <h2>encountered an Error while fetching data:{error.message}</h2>;
  }

  const elements = trucks?.map((truck) => (
    <>
      <div className="reviews-container">
        <h2>{truck.name}</h2>
        <div className="review">
          {truck.reviews?.map((review) => (
            <p>{review}</p>
          ))}
        </div>
      </div>
      <hr />
    </>
  ));

  return <div className="all-reviews">{elements}</div>;
}
