import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Photos() {
  const { truck } = useOutletContext();

  return truck ? (
    <div className="image-container">
      <img src={truck.truck_image} className="image" />
    </div>
  ) : (
    <p>Loading...</p>
  );
}
