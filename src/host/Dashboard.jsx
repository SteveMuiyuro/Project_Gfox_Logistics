import React, { useEffect, useState } from "react";
import { getHostTrucks } from "../../api";

export default function Dashboard() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchTrucks() {
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
        <h2>{truck.name}</h2>
        <img src={truck.imageUrl} className="dashboard-image" />
      </div>

      <div>
        <h3>Reviews</h3>
        {truck.reviews?.map((review) => (
          <p key={review}>{review}</p>
        ))}
      </div>

      <div>
        <h3>Income Generated:</h3>
        <p className="price">
          {truck.TotalIncome.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </div>
  ));
  return <div className="all-dashboard-items">{elements}</div>;
}
