import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import trucksFinder from "../../trucksFinder";
import StarRating from "../components/StarRating";

export default function Trucks() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    async function fetchTrucks() {
      setLoading(true);
      const data = await trucksFinder.get("/");
      setTrucks(data.data.trucks);
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
        <img src={truck.truck_image} className="truck-image" />
        <div>
          <h3>{truck.truck_name}</h3>
          <p>
            Price/Day:{" "}
            {truck.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="tonnage">Tonnage: {truck.tonnage}</p>
          <div className="trucks-rating">
            <span>Rating:</span>
            <StarRating rating={truck.average_rating} />
          </div>
          <i className="type">View {truck.type}</i>
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
      <h2>Explore and make a booking with us today!</h2>
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
