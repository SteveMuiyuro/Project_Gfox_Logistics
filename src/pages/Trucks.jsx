import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTrucks } from "../../api";

export default function Trucks() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    async function fetchTrucks() {
      setLoading(true);
      const data = await getTrucks();
      setTrucks(data);
      setLoading(false);
    }
    fetchTrucks();
  }, []);

  const displayTrucks = typeFilter
    ? trucks.filter((truck) => typeFilter === truck.type)
    : trucks;

  const truckElements = displayTrucks.map((truck) => (
    <div key={truck.id} className="truck">
      <Link
        to={truck.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={truck.imageUrl} className="truck-image" />
        <div>
          <h3>{truck.name}</h3>
          <p>
            Price/Day:{" "}
            {truck.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p>Tonnage: {truck.load}</p>
          <i className="type">{truck.type}</i>
        </div>
      </Link>
    </div>
  ));

  function handleSearchParams(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  loading ? <h2>Loading Trucks...</h2> : null;

  return (
    <div className="trucks-heading">
      <h2>Explore our variety of trucks, and make a booking with us today!</h2>
      <div className="filters">
        <button
          onClick={() => handleSearchParams("type", "Trailer")}
          className={`trailer-filter ${
            typeFilter === "Trailer" ? "selected" : ""
          }`}
        >
          Trailers
        </button>
        <button
          onClick={() => handleSearchParams("type", "Truck")}
          className={`truck-filter ${typeFilter === "Truck" ? "selected" : ""}`}
        >
          Trucks
        </button>
        {typeFilter ? (
          <button
            onClick={() => handleSearchParams("type", null)}
            className="clear-filter"
          >
            Clear Filters
          </button>
        ) : null}
      </div>
      <div className="truck-elements">{truckElements}</div>
    </div>
  );
}
