import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHostTrucks } from "../../api";

export default function YourTrucks() {
  const [trucks, setTrucks] = useState();

  useEffect(() => {
    async function loadTrucks() {
      const data = await getHostTrucks();
      setTrucks(data);
    }
    loadTrucks();
  }, []);

  const trucksElements = trucks?.map((truck) => (
    <Link to={truck.id} key={truck.id}>
      <div className="own-truck" key={truck.id}>
        <img src={truck.imageUrl} className="truck-image" />
        <div>
          <h2>{truck.name}</h2>
          <p>
            {truck.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
            /Day
          </p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="listed-own-trucks">
      <h1>Your Listed Trucks</h1>
      <div className="own-trucks">
        {trucks ? trucksElements : <p>Loading...</p>}
      </div>
    </div>
  );
}
