import Reac, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getTruck } from "../../api";

export default function TruckDetailsLayout() {
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchTrucks() {
      setLoading(true);
      try {
        const data = await getTruck(id);
        setTruck(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrucks();
  }, [id]);

  const isActiveStyles = {
    color: "#fb923c",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  if (loading) {
    return <h2>Loading Data...</h2>;
  }

  if (error) {
    return <h2>Identified error while fetching data:{error.message}</h2>;
  }

  return (
    <>
      {truck && (
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
