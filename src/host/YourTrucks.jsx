import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHostTrucks } from "../../api";
import trucksFinder from "../../trucksFinder";

export default function YourTrucks() {
  const [trucks, setTrucks] = useState();

  useEffect(() => {
    async function loadTrucks() {
      const data = await trucksFinder.get("/");
      setTrucks(data.data.trucks);
    }
    loadTrucks();
  }, []);

  const trucksElements = trucks?.map((truck) => (
    <div classname="host-trucks">
      <Link to={truck.id} key={truck.id}>
        <div className="own-truck" key={truck.id}>
          <img src={truck.truck_image} className="truck-image" />
          <div>
            <h2>{truck.truck_name}</h2>
            <p>{truck.type}</p>
          </div>
        </div>
      </Link>
    </div>
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
