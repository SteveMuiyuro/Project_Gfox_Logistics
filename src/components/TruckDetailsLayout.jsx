import Reac, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function TruckDetailsLayout() {
  const [truck, setTruck] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/host/trucks/${params.id}`)
      .then((res) => res.json())
      .then((data) => setTruck(data.trucks));
  }, [params.id]);

  const isActiveStyles = {
    color: "#fb923c",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <>
      {truck ? (
        <div className="host-truck">
          <img src={truck.imageUrl} />
          <div className="host-truck-details">
            <p className="host-truck-type">{truck.type}</p>
            <p>{truck.name}</p>
            <p>
              {truck.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <nav className="truck-navigation">
        <NavLink
          to="."
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
          end
        >
          Details
        </NavLink>
        <NavLink
          to="pricing"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Pricing
        </NavLink>
        <NavLink
          to="photos"
          style={({ isActive }) => (isActive ? isActiveStyles : null)}
        >
          Photos
        </NavLink>
      </nav>
      <Outlet context={{ truck }} />
    </>
  );
}
