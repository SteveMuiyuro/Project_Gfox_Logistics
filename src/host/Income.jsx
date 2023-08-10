import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { getHostTrucks } from "../../api";

export default function Income() {
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
    <>
      <div className="income-container">
        <h2>Name:{truck.name}</h2>
        <p>Accumulated Income To Date: </p>
        <p className="price">
          {truck.TotalIncome.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <hr />
    </>
  ));
  return <div className="all-income">{elements}</div>;
}
